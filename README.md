📌 Simple Login & Signup Web App

A basic full-stack authentication system built using Node.js, Express, MongoDB, and Vanilla JavaScript.
This project demonstrates user registration, login, and protected dashboard access using JWT authentication.

🚀 Features
User Signup (Register account)
User Login (Authentication)
JWT-based session handling
Password hashing using bcrypt
MongoDB database integration
Protected dashboard page
Frontend using HTML, CSS, JavaScript
🧠 Tech Stack

Frontend:

HTML
CSS
JavaScript (Vanilla)

Backend:

Node.js
Express.js

Database:

MongoDB
Mongoose

Security:

JWT (JSON Web Token)
bcrypt.js
📁 Project Structure
project/
│
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── style.css
│   └── script.js
│
└── README.md
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/login-signup-app.git
cd login-signup-app
2. Setup backend
cd backend
npm install
3. Create .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
4. Start server
node server.js

Server will run on:

http://localhost:5000
5. Run frontend

Simply open:

frontend/index.html
🔐 Authentication Flow
User signs up → data saved in MongoDB
User logs in → server validates credentials
JWT token is generated
Token stored in browser (localStorage)
Dashboard access granted only with valid token
🧪 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login user
📊 Future Improvements
Profile page
Profile picture upload
Create posts (mini social media)
Like & comment system
Follow/unfollow users
Real-time chat (Socket.io)
Deploy on cloud (Render / Netlify)
⚠️ Notes
Ensure MongoDB is running locally or use MongoDB Atlas
Always use a strong JWT secret in production
Do not expose .env file publicly

Built as a learning project for full-stack development basics.

📜 License

This project is open-source and free to use.
