const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Review content is required'],
    maxlength: [1000, 'Review cannot exceed 1000 characters'],
    trim: true
  },
  helpful: {
    type: Number,
    default: 0,
    min: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String
  }],
  wouldRecommend: {
    type: Boolean,
    required: true
  },
  pros: [String],
  cons: [String],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Ensure one review per customer per product
reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

// Update product ratings when review is saved
reviewSchema.post('save', async function() {
  try {
    const Product = mongoose.model('Product');
    const stats = await mongoose.model('Review').aggregate([
      { $match: { product: this.product, status: 'approved' } },
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(this.product, {
        'ratings.average': Math.round(stats[0].averageRating * 10) / 10,
        'ratings.count': stats[0].totalReviews
      });
    }
  } catch (error) {
    console.error('Error updating product ratings:', error);
  }
});

module.exports = mongoose.model('Review', reviewSchema);
