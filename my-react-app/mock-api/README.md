# Mock API Server

Mock API server cho hệ thống HRM/CMS sử dụng Express.js.

## Cài đặt

```bash
cd mock-api
npm install
```

## Chạy server

```bash
npm start
```

Hoặc chạy với auto-reload:

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Employees

- `GET /api/employees?page=1&limit=10&search=...` - Lấy danh sách employees (có search và pagination)
- `GET /api/employees/:id` - Lấy employee theo ID
- `POST /api/employees` - Tạo employee mới
- `PUT /api/employees/:id` - Cập nhật employee
- `DELETE /api/employees/:id` - Xóa employee
- `POST /api/employees/:id/avatar` - Upload avatar cho employee

### Departments

- `GET /api/departments?page=1&limit=10&search=...` - Lấy danh sách departments (có search và pagination)
- `GET /api/departments/:id` - Lấy department theo ID
- `POST /api/departments` - Tạo department mới
- `PUT /api/departments/:id` - Cập nhật department
- `DELETE /api/departments/:id` - Xóa department

## Lưu ý

- Tất cả endpoints (trừ login) yêu cầu Bearer token trong header `Authorization`
- Dữ liệu được lưu trong file JSON tại thư mục `data/`
- Ảnh upload được lưu tại thư mục `uploads/`
- Server hỗ trợ CORS để frontend có thể gọi API

