import mongoose, { Document, Schema } from 'mongoose';

export interface ITranslator extends Document {
  name: string;
  slug: string;
  description: string;
  avatar: string;
  novelCount: number;
}

const translatorSchema = new Schema<ITranslator>(
  {
    name: {
      type: String,
      required: [true, 'Translator name is required'],
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

translatorSchema.index({ slug: 1 });

export const Translator = mongoose.model<ITranslator>('Translator', translatorSchema);
