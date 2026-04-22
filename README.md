# 🚀 Isuru Computers (AKA I Computers) — Backend

The backend of **Isuru Computers**, also known as **I Computers**, powers a modern MERN e-commerce platform for browsing and ordering computer hardware products.

Built with **Node.js, Express, and MongoDB**, this backend handles authentication, users, products, orders, OTP password reset, email sending, Google login, and product reviews.

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Google OAuth
- Gmail / Google App Password for email sending

---

## ✨ Features

### 👤 User Features
- User registration
- User login
- JWT authentication
- Google login
- Forgot password with OTP
- Password reset
- Profile management
- Protected user routes

### 🛠️ Admin Features
- Admin dashboard support
- Manage products
- Add products
- Update products
- Delete products
- Order management
- Manage users
- Block and unblock users
- Change user roles
- View all product reviews
- Delete any review
- Edit any review through product APIs

### 📦 Product Features
- Create products
- Get all products
- Get product by ID
- Search products
- Update products
- Delete products

### ⭐ Review Features
- Get all reviews for a specific product
- Add review to a product
- Edit own review
- Delete own review
- Admin can edit or delete any review
- Admin can get all reviews from all products

### 📧 Email Features
- Send OTP through Google email service
- OTP expiration handling
- Transactional email support

---

# Installation

To set up the project locally, follow these steps:

## Setup🔧
The backend for this project is hosted in a separate repository. Follow these steps to set up the backend API server:

### Clone the Repository

```bash
git clone https://github.com/SenalAbeysekara/i-computers-backend.git
cd i-computers-backend
```

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm start
```

### Set up Environment Variables
Create a .env file in the root of the i-computers-backend directory and configure the necessary environment variables <br>
```bash
MONGO_URI
JWT_SECRET
GMAIL_APP_PASSWORD
```

## 📁 Project Structure

```bash
i-computers-backend
│
├── controllers
├── models
├── router
├── middlewares
├── index.js
├── package.json
└── .env
```
### License
MIT License
