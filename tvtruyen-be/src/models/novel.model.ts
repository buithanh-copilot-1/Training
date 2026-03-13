import mongoose, { Document, Schema } from 'mongoose';

export interface INovel extends Document {
  title: string;
  slug: string;
  alternativeTitles: string[];
  author: string;
  description: string;
  coverImage: string;
  categories: mongoose.Types.ObjectId[];
  status: 'ongoing' | 'completed';
  badge?: 'hot' | 'vip' | 'full';
  views: number;
  rating: number;
  ratingCount: number;
  chapterCount: number;
  isVIP: boolean;
  isExclusive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const novelSchema = new Schema<INovel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    alternativeTitles: [{
      type: String
    }],
    author: {
      type: String,
      default: 'Unknown'
    },
    description: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing'
    },
    badge: {
      type: String,
      enum: ['hot', 'vip', 'full', null],
      default: null
    },
    views: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    chapterCount: {
      type: Number,
      default: 0
    },
    isVIP: {
      type: Boolean,
      default: false
    },
    isExclusive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index for search and filters
novelSchema.index({ title: 'text', alternativeTitles: 'text', author: 'text' });
novelSchema.index({ slug: 1 });
novelSchema.index({ categories: 1 });
novelSchema.index({ status: 1 });
novelSchema.index({ badge: 1 });
novelSchema.index({ views: -1 });
novelSchema.index({ createdAt: -1 });

export const Novel = mongoose.model<INovel>('Novel', novelSchema);
