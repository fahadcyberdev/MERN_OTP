# MERN Email OTP System

A **production-ready MERN stack application** for user registration, login, and email verification via OTP. The frontend is built with **React, React Router, TailwindCSS, React Icons, and Toastify**, and the backend is **Node.js, Express, MongoDB** with JWT authentication.

---

## **Features**

- User Registration with **OTP sent via email**
- OTP Verification
- Login with **JWT authentication**
- Resend OTP functionality with **timer**
- Glassy, animated, professional frontend UI
- Toast notifications for all actions
- Fully connected frontend ↔ backend API

---

## **Frontend**

- **React** with Vite
- **Pages:**

  - Register (`Register.jsx`)
  - OTP Verification (`OTPVerify.jsx`) with **Resend OTP**
  - Login (`Login.jsx`)
  - Home (`Home.jsx`) protected with JWT

- **Components:**

  - OTPInput (`OTPInput.jsx`)
  - PageWrapper (`PageWrapper.jsx`) for consistent glassy UI

- **Libraries:**

  - `react-icons` for icons
  - `react-toastify` for notifications
  - `react-router-dom` for routing

### **Frontend Quick Start**

```bash
cd mern-otp-frontend
npm install
npm run dev
```

- Default dev server: `http://localhost:5173`
- Set **API_URL** in `config.js` to backend URL, e.g.:

```js
export const API_URL = "http://localhost:5000/api/auth";
```

---

## **Backend**

- **Node.js + Express**
- **MongoDB** for user data
- **Controllers**:

  - `registerUser` → register and send OTP
  - `verifyOTP` → verify OTP and generate JWT
  - `loginUser` → login with email & password
  - `resendOTP` → resend OTP

- **Security:**

  - Passwords hashed with **bcryptjs**
  - JWT authentication for protected routes

### **Backend Quick Start**

```bash
cd mern-otp-backend
npm install
npm run dev
```

- Default backend: `http://localhost:5000`
- Environment variables (`.env`):

```env
MONGO_URI=mongodb://localhost:27017/mern-otp
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## **API Endpoints**

| Route         | Method | Description              |
| ------------- | ------ | ------------------------ |
| `/register`   | POST   | Register user & send OTP |
| `/verify-otp` | POST   | Verify OTP & return JWT  |
| `/login`      | POST   | Login user & return JWT  |
| `/resend-otp` | POST   | Resend OTP to user email |

**Payload Example:**

```json
{
  "name": "Fahad Hosen",
  "email": "fahad@example.com",
  "password": "password123"
}
```

---

## **Frontend Flow**

1. User registers → OTP sent via email
2. User enters OTP → Verified → JWT stored in localStorage
3. User can login with email & password → JWT stored
4. Home page is protected; logout clears token
5. Resend OTP button works with **60s timer**

---

## **Technologies Used**

- Frontend: React, Vite, TailwindCSS, React Icons, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose, Bcrypt, JWT, Nodemailer

---

---

## **License**

MIT License © Fahad Hosen
