import mongoose, { Document, Schema } from 'mongoose';

export interface IChapter extends Document {
  novel: mongoose.Types.ObjectId;
  chapterNumber: number;
  title: string;
  content: string;
  views: number;
  isVIP: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const chapterSchema = new Schema<IChapter>(
  {
    novel: {
      type: Schema.Types.ObjectId,
      ref: 'Novel',
      required: true
    },
    chapterNumber: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    views: {
      type: Number,
      default: 0
    },
    isVIP: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound index for unique chapter per novel
chapterSchema.index({ novel: 1, chapterNumber: 1 }, { unique: true });
chapterSchema.index({ publishedAt: -1 });

export const Chapter = mongoose.model<IChapter>('Chapter', chapterSchema);
