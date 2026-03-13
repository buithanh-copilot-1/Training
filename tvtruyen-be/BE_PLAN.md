# BE Development Plan: tvtruyen-be

## Tech Stack
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT + bcrypt
- **Validation**: Zod / Joi

---

## Phase 1: Cấu trúc Project & Config

### 1.1 Setup Project
```
npm init -y
npm install express mongoose cors helmet morgan dotenv jsonwebtoken bcryptjs zod
npm install -D typescript @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs nodemon ts-node
npx tsc --init
```

### 1.2 Cấu trúc folder
```
src/
├── config/          # Database, env config
├── controllers/    # Request handlers
├── middleware/      # Auth, validation, error
├── models/         # Mongoose schemas
├── routes/         # Express routes
├── services/       # Business logic
├── types/          # TypeScript interfaces
├── utils/          # Helpers
├── validators/     # Zod schemas
├── app.ts          # Express app
└── index.ts        # Entry point
```

---

## Phase 2: Authentication (Auth → Novels → Features)

### 2.1 User Model
```typescript
// models/user.model.ts
{
  _id: ObjectId,
  username: string (unique),
  email: string (unique),
  password: string (hashed),
  avatar: string (optional),
  role: 'user' | 'admin',
  favorites: [ObjectId] (ref: Novel),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Auth Endpoints
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký user |
| POST | `/api/auth/login` | Đăng nhập, trả JWT |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại |
| PUT | `/api/auth/profile` | Cập nhật profile |
| POST | `/api/auth/change-password` | Đổi mật khẩu |

### 2.3 Auth Middleware
- `authMiddleware`: Verify JWT token
- `adminMiddleware`: Check admin role

---

## Phase 3: Novels & Chapters

### 3.1 Novel Model
```typescript
// models/novel.model.ts
{
  _id: ObjectId,
  title: string,
  slug: string (unique, auto-generate),
  alternativeTitles: [string],
  author: string,
  authorSlug: string (ref Author),
  description: string,
  coverImage: string,
  categories: [ObjectId] (ref: Category),
  status: 'ongoing' | 'completed',
  badge: 'hot' | 'vip' | 'full' | null,
  views: number (default: 0),
  rating: number (0-5),
  ratingCount: number,
  chapterCount: number,
  translator: ObjectId (ref: TranslatorGroup, optional),
  isVIP: boolean,
  isExclusive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3.2 Chapter Model
```typescript
// models/chapter.model.ts
{
  _id: ObjectId,
  novel: ObjectId (ref: Novel),
  chapterNumber: number,
  title: string,
  content: string (HTML),
  views: number,
  isVIP: boolean,
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 3.3 Novel Endpoints
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/novels` | Danh sách novels (filter, sort, pagination) |
| GET | `/api/novels/:slug` | Chi tiết novel |
| POST | `/api/novels` | Tạo novel (admin) |
| PUT | `/api/novels/:id` | Cập nhật novel (admin) |
| DELETE | `/api/novels/:id` | Xóa novel (admin) |

### 3.4 Chapter Endpoints
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/novels/:slug/chapters` | Danh sách chương |
| GET | `/api/novels/:slug/chapters/:chapterNumber` | Nội dung chương |
| POST | `/api/novels/:slug/chapters` | Tạo chương (admin) |
| PUT | `/api/novels/:slug/chapters/:chapterNumber` | Cập nhật chương (admin) |
| DELETE | `/api/novels/:slug/chapters/:chapterNumber` | Xóa chương (admin) |

### 3.5 Novel Filters (từ FE)
- Badge: `hot`, `vip`, `full`
- Status: `ongoing`, `completed`
- Category: slug
- Chapter count: `0-100`, `100-500`, `500-1000`, `1000+`
- Sort: `newest`, `views`, `chapters`

---

## Phase 4: Categories & Authors

### 4.1 Category Model
```typescript
// models/category.model.ts
{
  _id: ObjectId,
  name: string,
  slug: string (unique),
  description: string,
  icon: string,
  novelCount: number
}
```

### 4.2 Category Endpoints
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/categories` | Danh sách categories |
| GET | `/api/categories/:slug` | Chi tiết category + novels |

### 4.3 Author/Translator Models
```typescript
// models/author.model.ts
{
  _id: ObjectId,
  name: string,
  slug: string (unique),
  bio: string,
  avatar: string,
  novelCount: number
}

// models/translator.model.ts
{
  _id: ObjectId,
  name: string,
  slug: string (unique),
  description: string,
  avatar: string,
  novelCount: number
}
```

---

## Phase 5: Search & Filter

### 5.1 Search Endpoints
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/search` | Tìm kiếm nâng cao |

### 5.2 Search Query Params
```
?keyword=...&category=...&status=...&chapters=...&sort=newest&page=1&limit=20
```

### 5.3 Search Logic
- Text search: title, alternativeTitles, author
- Filter: category, status, chapter range
- Sort: newest, views, chapterCount

---

## Phase 6: Features (Optional - Phase sau)

### 6.1 User Interactions
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/novels/:id/follow` | Theo dõi novel |
| DELETE | `/api/novels/:id/follow` | Bỏ theo dõi |
| POST | `/api/novels/:id/rate` | Đánh giá novel |
| GET | `/api/users/favorites` | Danh sách yêu thích |

### 6.2 Rankings
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/rankings/day` | Top novels ngày |
| GET | `/api/rankings/week` | Top novels tuần |
| GET | `/api/rankings/month` | Top novels tháng |

### 6.3 Reading Progress
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/reading/progress` | Lấy tiến độ đọc |
| PUT | `/api/reading/progress` | Cập nhật chương đang đọc |

---

## API Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

### Error
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

### Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## Priority Implement Order

1. **Setup**: Project config, database connection
2. **Auth**: Register, Login, JWT middleware
3. **Novels**: CRUD Novels, CRUD Chapters
4. **Categories**: Categories endpoints
5. **Search**: Advanced search
6. **Features**: Follow, Rate, Rankings

---

## Notes
- Auto-generate slug từ title
- Cache các endpoint hay truy cập (rankings, categories)
- Validate input với Zod
- Rate limiting cho auth endpoints
- Upload ảnh: Cloudinary hoặc local storage
