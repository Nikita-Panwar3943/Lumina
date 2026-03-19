# LUMINA Skincare E-commerce

A modern, high-converting skincare e-commerce website built with React, Vite, and Express.js.

## 🚀 Project Structure

```
lumina-skincare-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── SearchBar.jsx
│   │   └── Profile.jsx
│   ├── pages/              # Page components
│   │   ├── AuthPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── CollectionsPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── FAQPage.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies

lumina-skincare-backend/
├── models/                # MongoDB models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Review.js
├── routes/                # API routes
│   ├── auth.js
│   ├── products.js
│   ├── users.js
│   └── orders.js
├── middleware/            # Express middleware
│   └── auth.js
├── server.js              # Server entry point
├── seed.js                # Database seeder
└── package.json           # Dependencies
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS Variables** - Custom properties for theming

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd lumina-skincare-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd lumina-skincare-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already included):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/lumina-skincare
JWT_SECRET=your_jwt_secret_key_here_change_in_production
CLIENT_URL=http://localhost:5173
```

4. Start MongoDB server (if using local instance)

5. Seed the database with sample data:
```bash
node seed.js
```

6. Start the backend server:
```bash
npm start
```

The backend API will be available at `http://localhost:5000`

## 📱 Features

### ✅ Implemented Features
- **Homepage** with hero section, featured products, benefits, testimonials
- **Product Pages** with detailed information, reviews, add to cart
- **Collections Page** with filtering and sorting
- **User Authentication** (signup/login) with localStorage
- **Shopping Cart** with localStorage persistence
- **Search Functionality** with live results
- **Profile Page** with order history and account management
- **Admin Dashboard** for product management
- **Responsive Design** optimized for all devices
- **Modern UI/UX** with smooth animations and transitions

### 🎨 Design Features
- **Premium Color Palette**: Rose pink (#e8b4b8), navy (#2c3e50), warm gray
- **Typography**: Poppins and Inter fonts
- **Micro-interactions**: Hover effects, smooth transitions
- **Loading States**: Skeleton screens and loading animations
- **Toast Notifications**: Success messages for user actions

### 🔧 Technical Features
- **Component Architecture**: Reusable, modular components
- **State Management**: Local state with hooks
- **Data Persistence**: localStorage for cart and user data
- **Event System**: Custom events for component communication
- **Form Validation**: Client-side validation with error handling
- **SEO Optimized**: Meta tags and semantic HTML

## 🛒 Shopping Flow

1. **Browse Products**: View featured products on homepage or browse collections
2. **Search**: Use the search bar to find specific products
3. **Add to Cart**: Click the cart button on product cards
4. **View Cart**: Click the cart icon in header to view/manage items
5. **Checkout**: Click "Proceed to Checkout" (demo mode)
6. **Authentication**: Sign up or login to access profile
7. **Profile Management**: View order history, manage addresses, payment methods

## 🔐 Authentication

Currently using localStorage for demo purposes. In production:
- JWT tokens for secure authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Session management

## 📦 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## 🎯 Next Steps

### Production Improvements
- [ ] Connect to real payment gateway (Stripe, PayPal)
- [ ] Implement secure JWT authentication
- [ ] Add email verification
- [ ] Implement real-time order tracking
- [ ] Add product reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add discount/coupon system
- [ ] Implement inventory management
- [ ] Add analytics and tracking
- [ ] Optimize for performance (lazy loading, code splitting)

### Additional Features
- [ ] Product comparison
- [ ] Size/color variants
- [ ] Product recommendations
- [ ] Live chat support
- [ ] Social media integration
- [ ] Blog/content management
- [ ] Multi-language support
- [ ] Currency conversion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Unsplash for product images
- Lucide React for beautiful icons
- Google Fonts for typography
- React and Vite communities
