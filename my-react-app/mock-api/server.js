import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Cấu hình delay (ms) - có thể thay đổi để mô phỏng mạng chậm/nhanh
const DELAY_MS = process.env.DELAY_MS ? parseInt(process.env.DELAY_MS) : 500;

// Helper function để delay response
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Middleware delay cho tất cả API routes
const delayMiddleware = async (req, res, next) => {
  // Bỏ qua delay cho static files
  if (req.path.startsWith('/uploads')) {
    return next();
  }
  
  await delay(DELAY_MS);
  next();
};

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Áp dụng delay middleware cho tất cả routes
app.use('/api', delayMiddleware);

// Đảm bảo thư mục uploads tồn tại
const uploadsDir = join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình multer cho upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${uuidv4()}.${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép upload file ảnh'));
    }
  },
});

// Helper functions để đọc/ghi file
const readDataFile = (filename) => {
  const filePath = join(__dirname, 'data', filename);
  try {
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

const writeDataFile = (filename, data) => {
  const filePath = join(__dirname, 'data', filename);
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// ==================== AUTH ROUTES ====================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Mock authentication - chấp nhận bất kỳ email/password nào
  if (!email || !password) {
    return res.status(400).json({ error: 'Email và password là bắt buộc' });
  }

  const token = `mock-jwt-token-${Date.now()}-${uuidv4()}`;
  const user = {
    id: 1,
    name: 'Admin User',
    email: email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
  };

  res.json({
    token,
    user,
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Đăng xuất thành công' });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Mock user data
  const user = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  };

  res.json(user);
});

// ==================== EMPLOYEE ROUTES ====================

// Middleware để kiểm tra authentication
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// GET /api/employees - Lấy danh sách employees với search và pagination
app.get('/api/employees', authenticate, (req, res) => {
  const employees = readDataFile('employees.json');
  const departments = readDataFile('departments.json');

  let filtered = employees.map((emp) => {
    const dept = departments.find((d) => d.id === emp.departmentId);
    return {
      ...emp,
      departmentName: dept?.name || '',
    };
  });

  // Search filter
  const search = req.query.search;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower) ||
        emp.phone.includes(search) ||
        emp.position.toLowerCase().includes(searchLower) ||
        emp.departmentName?.toLowerCase().includes(searchLower)
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = filtered.slice(start, end);

  res.json({
    data: paginated,
    total: filtered.length,
    page,
    limit,
  });
});

// GET /api/employees/:id - Lấy employee theo ID
app.get('/api/employees/:id', authenticate, (req, res) => {
  const employees = readDataFile('employees.json');
  const departments = readDataFile('departments.json');
  const id = parseInt(req.params.id);

  const employee = employees.find((emp) => emp.id === id);
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const dept = departments.find((d) => d.id === employee.departmentId);
  res.json({
    ...employee,
    departmentName: dept?.name || '',
  });
});

// POST /api/employees - Tạo employee mới
app.post('/api/employees', authenticate, (req, res) => {
  const employees = readDataFile('employees.json');
  const departments = readDataFile('departments.json');

  const { name, email, phone, position, departmentId, salary, joinDate, avatar } = req.body;

  if (!name || !email || !phone || !position || !departmentId || !avatar) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  // Kiểm tra email trùng
  if (employees.some((emp) => emp.email === email)) {
    return res.status(400).json({ error: 'Email đã tồn tại' });
  }

  const newId = Math.max(...employees.map((e) => e.id), 0) + 1;
  const dept = departments.find((d) => d.id === departmentId);

  const newEmployee = {
    id: newId,
    name,
    email,
    phone,
    position,
    departmentId,
    departmentName: dept?.name || '',
    salary: salary || null,
    joinDate: joinDate || null,
    avatar: avatar || null,
  };

  employees.push(newEmployee);
  writeDataFile('employees.json', employees);

  res.status(201).json(newEmployee);
});

// PUT /api/employees/:id - Cập nhật employee
app.put('/api/employees/:id', authenticate, (req, res) => {
  const employees = readDataFile('employees.json');
  const departments = readDataFile('departments.json');
  const id = parseInt(req.params.id);

  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const { name, email, phone, position, departmentId, salary, joinDate, avatar } = req.body;

  // Kiểm tra email trùng (nếu thay đổi email)
  if (email && email !== employees[index].email) {
    if (employees.some((emp) => emp.email === email && emp.id !== id)) {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }
  }

  const updatedEmployee = {
    ...employees[index],
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(position && { position }),
    ...(departmentId && { departmentId }),
    ...(salary !== undefined && { salary }),
    ...(joinDate && { joinDate }),
    ...(avatar && { avatar }),
  };

  if (departmentId) {
    const dept = departments.find((d) => d.id === departmentId);
    updatedEmployee.departmentName = dept?.name || '';
  }

  employees[index] = updatedEmployee;
  writeDataFile('employees.json', employees);

  res.json(updatedEmployee);
});

// DELETE /api/employees/:id - Xóa employee
app.delete('/api/employees/:id', authenticate, (req, res) => {
  const employees = readDataFile('employees.json');
  const id = parseInt(req.params.id);

  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employees.splice(index, 1);
  writeDataFile('employees.json', employees);

  res.json({ message: 'Employee deleted successfully' });
});

// POST /api/employees/:id/avatar - Upload avatar cho employee
app.post('/api/employees/:id/avatar', authenticate, upload.single('avatar'), (req, res) => {
  const employees = readDataFile('employees.json');
  const id = parseInt(req.params.id);

  if (!req.file) {
    return res.status(400).json({ error: 'Không có file được upload' });
  }

  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  const avatarUrl = `/uploads/${req.file.filename}`;
  employees[index].avatar = `http://localhost:${PORT}${avatarUrl}`;
  writeDataFile('employees.json', employees);

  res.json({
    ...employees[index],
    avatar: employees[index].avatar,
  });
});

// ==================== DEPARTMENT ROUTES ====================

// GET /api/departments - Lấy danh sách departments với search và pagination
app.get('/api/departments', authenticate, (req, res) => {
  const departments = readDataFile('departments.json');
  const employees = readDataFile('employees.json');

  let filtered = departments.map((dept) => {
    const employeeCount = employees.filter((emp) => emp.departmentId === dept.id).length;
    const manager = dept.managerId
      ? employees.find((emp) => emp.id === dept.managerId)
      : null;

    return {
      ...dept,
      employeeCount,
      managerName: manager?.name || dept.managerName || null,
    };
  });

  // Search filter
  const search = req.query.search;
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchLower) ||
        dept.description.toLowerCase().includes(searchLower) ||
        dept.managerName?.toLowerCase().includes(searchLower)
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = filtered.slice(start, end);

  res.json({
    data: paginated,
    total: filtered.length,
    page,
    limit,
  });
});

// GET /api/departments/:id - Lấy department theo ID
app.get('/api/departments/:id', authenticate, (req, res) => {
  const departments = readDataFile('departments.json');
  const employees = readDataFile('employees.json');
  const id = parseInt(req.params.id);

  const department = departments.find((dept) => dept.id === id);
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }

  const employeeCount = employees.filter((emp) => emp.departmentId === id).length;
  const manager = department.managerId
    ? employees.find((emp) => emp.id === department.managerId)
    : null;

  res.json({
    ...department,
    employeeCount,
    managerName: manager?.name || department.managerName || null,
  });
});

// POST /api/departments - Tạo department mới
app.post('/api/departments', authenticate, (req, res) => {
  const departments = readDataFile('departments.json');
  const employees = readDataFile('employees.json');

  const { name, description, managerId } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  // Kiểm tra tên trùng
  if (departments.some((dept) => dept.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({ error: 'Tên phòng ban đã tồn tại' });
  }

  const newId = Math.max(...departments.map((d) => d.id), 0) + 1;
  const manager = managerId ? employees.find((emp) => emp.id === managerId) : null;

  const newDepartment = {
    id: newId,
    name,
    description,
    managerId: managerId || null,
    managerName: manager?.name || null,
    employeeCount: 0,
  };

  departments.push(newDepartment);
  writeDataFile('departments.json', departments);

  res.status(201).json(newDepartment);
});

// PUT /api/departments/:id - Cập nhật department
app.put('/api/departments/:id', authenticate, (req, res) => {
  const departments = readDataFile('departments.json');
  const employees = readDataFile('employees.json');
  const id = parseInt(req.params.id);

  const index = departments.findIndex((dept) => dept.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }

  const { name, description, managerId } = req.body;

  // Kiểm tra tên trùng (nếu thay đổi tên)
  if (name && name.toLowerCase() !== departments[index].name.toLowerCase()) {
    if (departments.some((dept) => dept.name.toLowerCase() === name.toLowerCase() && dept.id !== id)) {
      return res.status(400).json({ error: 'Tên phòng ban đã tồn tại' });
    }
  }

  const manager = managerId ? employees.find((emp) => emp.id === managerId) : null;
  const employeeCount = employees.filter((emp) => emp.departmentId === id).length;

  const updatedDepartment = {
    ...departments[index],
    ...(name && { name }),
    ...(description && { description }),
    ...(managerId !== undefined && { managerId: managerId || null }),
    managerName: manager?.name || null,
    employeeCount,
  };

  departments[index] = updatedDepartment;
  writeDataFile('departments.json', departments);

  res.json(updatedDepartment);
});

// DELETE /api/departments/:id - Xóa department
app.delete('/api/departments/:id', authenticate, (req, res) => {
  const departments = readDataFile('departments.json');
  const employees = readDataFile('employees.json');
  const id = parseInt(req.params.id);

  const index = departments.findIndex((dept) => dept.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }

  // Kiểm tra xem có employees nào thuộc department này không
  const hasEmployees = employees.some((emp) => emp.departmentId === id);
  if (hasEmployees) {
    return res.status(400).json({ error: 'Không thể xóa phòng ban có nhân viên' });
  }

  departments.splice(index, 1);
  writeDataFile('departments.json', departments);

  res.json({ message: 'Department deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File quá lớn (tối đa 5MB)' });
    }
  }
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server đang chạy tại http://localhost:${PORT}`);
  console.log(`⏱️  Delay mỗi request: ${DELAY_MS}ms (có thể thay đổi bằng biến môi trường DELAY_MS)`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   POST   /api/auth/logout`);
  console.log(`   GET    /api/auth/me`);
  console.log(`   GET    /api/employees?page=1&limit=10&search=...`);
  console.log(`   GET    /api/employees/:id`);
  console.log(`   POST   /api/employees`);
  console.log(`   PUT    /api/employees/:id`);
  console.log(`   DELETE /api/employees/:id`);
  console.log(`   POST   /api/employees/:id/avatar`);
  console.log(`   GET    /api/departments?page=1&limit=10&search=...`);
  console.log(`   GET    /api/departments/:id`);
  console.log(`   POST   /api/departments`);
  console.log(`   PUT    /api/departments/:id`);
  console.log(`   DELETE /api/departments/:id`);
});

