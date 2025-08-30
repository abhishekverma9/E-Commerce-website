# 🛍️ Forever

**Forever** is a modern full‑stack **E‑Commerce** platform built with the **MERN stack**. It provides a complete online shopping experience with product listings, shopping cart, secure checkout, and **Razorpay payment integration**. Designed with scalability and user‑friendliness in mind, Forever is perfect for both customers and admins.

---

## ✨ Features

* 👤 **User Authentication** – Secure login & signup with JWT + bcrypt
* 🛒 **Product Management** – Browse products, view details, and add to cart
* 💳 **Online Payments** – Seamless checkout experience with **Razorpay integration**
* 📦 **Order Management** – Users can track their orders after payment
* 🖼 **Image Storage** – Product images handled via **Cloudinary**
* 📊 **Admin Dashboard** – Manage products, orders, and users
* 📱 **Responsive Design** – Optimized for desktop & mobile

---

## 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT & bcrypt
* **Payments:** Razorpay
* **Image Storage:** Cloudinary

---

## 📂 Folder Structure

```
forever/
│── frontend/          # React frontend (user store)
│── admin/             # React frontend (admin panel)
│── backend/           # Express + Node.js backend
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Forever.git
cd Forever
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend (User Store)

```bash
cd ../frontend
npm install
```

#### Admin Panel

```bash
cd ../admin
npm install
```

### 3️⃣ Run the Application

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend (User Store)

```bash
cd frontend
npm start
```

#### Admin Panel

```bash
cd admin
npm start
```

Open your browser at:

```
http://localhost:5173/     # User store
http://localhost:5174/     # Admin panel 
```

---

## 🎥 Demo Flow

1. Users register/login securely
2. Browse products and add items to the cart
3. Proceed to checkout and pay using Razorpay
4. Orders are created and stored in the database
5. Users can track their orders, and admins can manage them via the dashboard



## 🤝 Contributing

Contributions are welcome! Fork this repo, make your improvements, and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📸 Screenshots

