const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/paymentModel");
const User = require("../models/user");
const { membershipAmount } = require("../utils/constants");

/* NODE SDK: https://github.com/razorpay/razorpay-node */
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

//using userAuth middleware so that only loggedIn can access it
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user; //user details from userAuth middleware

    //this is code to create an order on razorpay
    //50000, means 500 . INR means pesa
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, // Convert to paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    //Save it in my database
    console.log(order);

    const payment = new Payment({
      userId: req.user._id, //userId from userAuth middleware
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();

    // Return back my order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      //validateWebhookSignature is verfies that the webhook is coming from razorpay or not
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );
    if (!isWebhookValid) {
      return res.status(400).json({ msg: "webhook signature is invalid" });
    }

    // ✅ Add this check to only process successful payments (additional)
    if (req.body.event !== "payment.captured") {
      return res.status(200).json({ msg: "Event ignored" });
    }

    // Update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity; //payment details from razorpay webhook

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true; //update the user as premium
    user.membershipType = payment.notes.membershipType; //update the membership type of user, whether its silver or gold
    await user.save();

    // Update the user as premium in DB.

    //check payment status is captured or failed and update it in database accordingly
    // if (req.body.event === "payment.captured") {
    // }
    // if (req.body.event === "payment.failed") {
    // }

    // return success response to razorpay so that it will not send the webhook(webhook only be called on production) again and again
    return res.status(200).json({ msg: "Payment status updated successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//verifying user is premium or not.(after payment is successfull)
paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON(); //user details from userAuth middleware
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;
