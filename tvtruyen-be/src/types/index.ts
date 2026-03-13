import { Request } from 'express';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INovel {
  _id: string;
  title: string;
  slug: string;
  alternativeTitles: string[];
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
  status: 'ongoing' | 'completed';
  badge?: 'hot' | 'vip' | 'full' | null;
  views: number;
  rating: number;
  ratingCount: number;
  chapterCount: number;
  isVIP: boolean;
  isExclusive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChapter {
  _id: string;
  novel: string;
  chapterNumber: number;
  title: string;
  content: string;
  views: number;
  isVIP: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  novelCount: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
