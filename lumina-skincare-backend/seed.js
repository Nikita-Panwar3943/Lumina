const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@lumina.com',
      password: adminPassword,
      role: 'admin',
      emailVerified: true
    });
    await adminUser.save();

    // Create sample products
    const products = [
      {
        name: 'Radiance Vitamin C Serum',
        description: 'Transform your skin with our powerful Vitamin C serum. This breakthrough formula delivers 20% pure Vitamin C to brighten, firm, and protect your skin.',
        shortDescription: 'Brightening serum with 20% Vitamin C',
        price: 89.99,
        originalPrice: 119.99,
        category: 'serums',
        sku: 'LUM-VITC-001',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1620916566398-39f168eb0ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            alt: 'Radiance Vitamin C Serum',
            isMain: true
          }
        ],
        inventory: {
          quantity: 45,
          lowStockThreshold: 10
        },
        ingredients: [
          { name: 'Vitamin C', percentage: 20, isKey: true },
          { name: 'Hyaluronic Acid', percentage: 2, isKey: true },
          { name: 'Vitamin E', percentage: 1, isKey: false }
        ],
        benefits: ['Brightens skin', 'Reduces fine lines', 'Antioxidant protection'],
        usage: {
          instructions: 'Apply 3-4 drops to clean face and neck, morning and evening',
          frequency: 'Daily',
          morning: true,
          evening: true
        },
        skinTypes: ['normal', 'dry', 'oily', 'combination', 'sensitive'],
        concerns: ['aging', 'dark-spots'],
        featured: true,
        badge: 'bestseller'
      },
      {
        name: 'Hydra-Boost Moisturizer',
        description: 'Intense hydration that lasts all day. This lightweight moisturizer combines hyaluronic acid with natural botanicals to plump and nourish your skin.',
        shortDescription: '24-hour hydrating moisturizer',
        price: 64.99,
        category: 'moisturizers',
        sku: 'LUM-HYD-002',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556228720-195a672e8a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            alt: 'Hydra-Boost Moisturizer',
            isMain: true
          }
        ],
        inventory: {
          quantity: 78,
          lowStockThreshold: 15
        },
        ingredients: [
          { name: 'Hyaluronic Acid', percentage: 5, isKey: true },
          { name: 'Ceramides', percentage: 2, isKey: true },
          { name: 'Niacinamide', percentage: 4, isKey: false }
        ],
        benefits: ['Deep hydration', 'Plumps skin', 'Strengthens barrier'],
        usage: {
          instructions: 'Apply to clean face and neck after serum',
          frequency: 'Daily',
          morning: true,
          evening: true
        },
        skinTypes: ['normal', 'dry', 'combination', 'sensitive'],
        concerns: ['dryness'],
        featured: true,
        badge: 'new'
      },
      {
        name: 'Gentle Foaming Cleanser',
        description: 'Remove impurities without stripping your skin. This pH-balanced cleanser effectively removes makeup and dirt while maintaining your skin\'s natural moisture barrier.',
        shortDescription: 'pH-balanced gentle cleanser',
        price: 44.99,
        category: 'cleansers',
        sku: 'LUM-CLN-003',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571781920623-75e96e30a72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            alt: 'Gentle Foaming Cleanser',
            isMain: true
          }
        ],
        inventory: {
          quantity: 12,
          lowStockThreshold: 10
        },
        ingredients: [
          { name: 'Glycerin', percentage: 5, isKey: true },
          { name: 'Green Tea Extract', percentage: 2, isKey: false },
          { name: 'Chamomile', percentage: 1, isKey: false }
        ],
        benefits: ['Gentle cleansing', 'Maintains pH', 'Soothes skin'],
        usage: {
          instructions: 'Massage onto damp skin, rinse thoroughly with warm water',
          frequency: 'Twice daily',
          morning: true,
          evening: true
        },
        skinTypes: ['normal', 'dry', 'oily', 'combination', 'sensitive'],
        concerns: ['sensitivity'],
        featured: false
      },
      {
        name: 'Retinol Night Cream',
        description: 'Advanced anti-aging treatment with 0.5% retinol. This powerful formula reduces wrinkles, improves texture, and promotes collagen production while you sleep.',
        shortDescription: 'Anti-aging night cream with retinol',
        price: 94.99,
        originalPrice: 124.99,
        category: 'moisturizers',
        sku: 'LUM-RET-004',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1620916566398-39f168eb0ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            alt: 'Retinol Night Cream',
            isMain: true
          }
        ],
        inventory: {
          quantity: 3,
          lowStockThreshold: 10
        },
        ingredients: [
          { name: 'Retinol', percentage: 0.5, isKey: true },
          { name: 'Peptides', percentage: 2, isKey: true },
          { name: 'Ceramides', percentage: 3, isKey: false }
        ],
        benefits: ['Reduces wrinkles', 'Improves texture', 'Boosts collagen'],
        usage: {
          instructions: 'Apply to clean face at night, 2-3 times per week',
          frequency: 'Nightly',
          morning: false,
          evening: true
        },
        skinTypes: ['normal', 'dry', 'oily', 'combination'],
        concerns: ['aging'],
        featured: true,
        badge: 'limited'
      }
    ];

    await Product.insertMany(products);

    console.log('Database seeded successfully!');
    console.log('Admin user: admin@lumina.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lumina-skincare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  seedData();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
