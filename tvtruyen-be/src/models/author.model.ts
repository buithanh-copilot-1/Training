import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  novelCount: number;
}

const authorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    bio: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
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

authorSchema.index({ slug: 1 });

export const Author = mongoose.model<IAuthor>('Author', authorSchema);
