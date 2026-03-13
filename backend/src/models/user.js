const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      //if email validator is false
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong password :" + value);
        }
      },
    },
    age: {
      type: Number,
      required: false,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others", "Male", "Female", "Others"],
        message: `{values} is not a valid gender type`,
      },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      //showing the membership type of user, whether its silver or gold
      type: String,
    },

    photoUrl: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL :" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

//compound index(find user with firstName and lastName), 1 means ascending order
userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  //this -> "this" will represent particular user instance
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// for password validations
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};

const User = model("User", userSchema);
module.exports = User;
