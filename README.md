# 🍔 Foodie Heaven

Foodie Heaven is a full-stack food ordering web application inspired by platforms like **Swiggy** and **Zomato**.  
It includes a **customer-facing app**, a **secure admin panel**, and a **Firebase-powered backend**.

---

## 🚀 Features

### 👤 User Features
- User authentication (Firebase Auth)
- Browse menu items
- Add / remove items from cart
- Quantity management
- Secure checkout flow
- Persistent cart state
- Order creation & tracking (Firestore)

### 🛠️ Admin Panel
- Role-based access (Admin / Super Admin)
- Dashboard overview (orders, revenue, users)
- Menu management (add / delete items)
- Real-time updates via Firestore
- Protected admin routes
- Secure session handling

### 🔐 Authentication & Security
- Firebase Authentication
- Firestore role-based authorization
- Protected routes
- Admin-only access control

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Bootstrap 5

### Backend / Services
- Firebase Authentication
- Firebase Firestore
- Firebase Hosting (planned)

### Performance & Quality
- Lazy loading
- Code splitting
- Lighthouse optimized
- SEO-friendly structure
- Accessible UI

---

## 📂 Project Structure

foodie-heaven/
│
├── src/
│ ├── components/ # Navbar, Footer, UI components
│ ├── pages/ # Home, Menu, Cart, Login
│ ├── admin/ # Admin dashboard & modules
│ ├── context/ # AuthContext, CartContext
│ ├── firebase.js # Firebase configuration
│ ├── App.js
│ └── index.js
│
├── public/
├── README.md
└── package.json

---

## 🔥 Admin Roles (Firestore)

```json
users/
  userId/
    email: "admin@example.com"
    role: "admin"

orders/
  orderId/
    userId
    email
    items[]
    total
    status
    createdAt

Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/foodie-heaven.git
cd foodie-heaven

2️⃣ Install Dependencies
npm install

3️⃣ Firebase Setup

Create a Firebase project

Enable Authentication (Email/Password)

Enable Firestore

Add your Firebase config to firebase.js

4️⃣ Run Development Server
npm start

📦 Production Build
npm run build

To test production build locally:

npx serve -s build

📊 Lighthouse Scores (Production)

Performance: ⚡ 90+

Accessibility: ♿ 95–100

Best Practices: ✅ 95–100

SEO: 🔍 100

Note: Lower scores on localhost are expected due to Firebase & dev mode.

🛣️ Roadmap

Online payments (Razorpay / Stripe)

Order status tracking (Preparing → Delivered)

Delivery partner module

Notifications (Email / Push)

Analytics dashboard

Mobile PWA support

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

📜 License

This project is for educational and personal use.

🙌 Author

Anugrah Tripathi
Founder – LEO Technological Labs, Services & Studio

---

## ✅ Why this README is GOOD
✔ Looks professional  
✔ Explains backend clearly  
✔ Shows admin system (big plus)  
✔ Recruiter / reviewer friendly  
✔ Matches your real implementation  

If you want next:
- ⭐ Badges (Lighthouse, Firebase, React)
- 📸 Screenshots section
- 🚀 Deployment instructions
- 🧑‍💻 Resume-ready project description

Just tell me 😄
