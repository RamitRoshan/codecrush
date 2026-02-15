# CodeCrush

**Where Developers Match, Collaborate, and Code Together.**

CodeCrush is a full-stack MERN web application that enables developers to connect, collaborate, and communicate with like-minded tech enthusiasts. <br>
It’s a `developer-first` networking platform that uses intelligent matching and real-time chat to turn shared tech interests into meaningful collaborations.


## 🌟 Features

**🔐 Authentication & Authorization**

- JWT-based authentication
- Password hashing using bcrypt
- Secure protected routes
- Forgot / Reset password flow
- Optional email verification


**👤 Developer Profile System**

- Create & edit developer profile.
- Upload profile photo (Cloudinary).
- Add tech stacks (skills, languages, frameworks).
- Bio, location, GitHub & LinkedIn links.
- Preference settings (mentor, project partner, etc.)


**❤️ Developer Matching System**

- Swipe(Scroll) / Like / Dislike mechanism.
- Match created when both users like each other.
- Matching algorithm based on:

    - Common skills
    - Interests
    - Location proximity (optional)


**🤖 AI-Powered Match Suggestions**

- Backend rule-based scoring algorithm.
- Smart recommendations based on:
    - Skills similarity
    - Complementary tech stacks
    - Goals alignment

- Optional OpenAI integration for AI similarity scoring.
- Dedicated /api/suggestions endpoint.


**💬 Real-Time Chat (Socket.IO)**

- One-to-one chat between matched users
- Typing indicator
- Online/Offline status
- Read receipts
- Chat history stored in MongoDB


**🔔 Notifications System**

- Real-time notifications

    - When someone likes you
    - When a match occurs
    - When a new message arrives

- Mark as read/unread
- Stored in MongoDB


**💎 Subscription & Payments**

- Razorpay integration
- Premium features:

    - View who liked your profile
    - Unlimited swipes


## Tech Stack


**Frontend**

- React.js
- Redux Toolkit
- Tailwind CSS
- React Router
- Socket.IO Client
- React Toastify

**⚙ Backend**

- Node.js
- Express.js
- MongoDB Atlas
- Socket.IO
- JWT Authentication
- bcrypt
- Joi Validation
- Morgan Logger
- dotenv


## 📁 Project Structure

```
codecrush/
│
├── frontend/   # React + Redux + Tailwind
├── backend/    # Node + Express + MongoDB + Socket.IO
└── README

```
`Monorepo architecture with separate frontend and backend.`


<br>

---

### Getting Started


**1. Clone the repository**
```
git clone https://github.com/your-username/codecrush.git
cd codecrush
```

**2. Setup Backend**
```
cd backend
npm install
npm run dev
```

**Create a .env file inside backend/:**
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_config
```


**3. Setup Frontend**
```
cd frontend
npm install
npm run dev
```


**Create .env inside frontend/:**
```
VITE_API_URL=http://localhost:5000
```


### Deployment

- Frontend → Vercel
- Backend → Render / AWS
- MongoDB → MongoDB Atlas

<br>

---

**📌Future Improvements (Optional)**

- Advanced AI-based recommendation engine
- Mobile application version
- Admin dashboard
- Video calling integration


**👨‍💻 Developed By**

~ Ramit Roshan
