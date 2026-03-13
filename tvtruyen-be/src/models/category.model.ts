import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  novelCount: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'fa-book'
    },
    novelCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

categorySchema.index({ slug: 1 });

export const Category = mongoose.model<ICategory>('Category', categorySchema);
