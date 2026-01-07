export interface Department {
  id: number;
  name: string;
  description: string;
  managerId?: number;
  managerName?: string;
  employeeCount?: number;
}

export interface DepartmentListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface DepartmentListResponse {
  data: Department[];
  total: number;
  page: number;
  limit: number;
}

// Mock data - trong thực tế sẽ gọi API thật
const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'IT',
    description: 'Phòng Công nghệ Thông tin',
    managerId: 3,
    managerName: 'Lê Văn C',
    employeeCount: 15,
  },
  {
    id: 2,
    name: 'Design',
    description: 'Phòng Thiết kế',
    managerId: 2,
    managerName: 'Trần Thị B',
    employeeCount: 8,
  },
  {
    id: 3,
    name: 'HR',
    description: 'Phòng Nhân sự',
    employeeCount: 5,
  },
  {
    id: 4,
    name: 'Marketing',
    description: 'Phòng Marketing',
    employeeCount: 10,
  },
];

export const getDepartments = async (params: DepartmentListParams): Promise<DepartmentListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockDepartments];
      
      // Search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (dept) =>
            dept.name.toLowerCase().includes(searchLower) ||
            dept.description.toLowerCase().includes(searchLower)
        );
      }

      const page = params.page || 1;
      const limit = params.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;

      resolve({
        data: filtered.slice(start, end),
        total: filtered.length,
        page,
        limit,
      });
    }, 300);
  });
};

export const getDepartmentById = async (id: number): Promise<Department> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const department = mockDepartments.find((dept) => dept.id === id);
      if (department) {
        resolve(department);
      } else {
        reject(new Error('Department not found'));
      }
    }, 300);
  });
};

export const createDepartment = async (data: Omit<Department, 'id'>): Promise<Department> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDepartment: Department = {
        ...data,
        id: mockDepartments.length + 1,
      };
      mockDepartments.push(newDepartment);
      resolve(newDepartment);
    }, 300);
  });
};

export const updateDepartment = async (id: number, data: Partial<Department>): Promise<Department> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockDepartments.findIndex((dept) => dept.id === id);
      if (index !== -1) {
        mockDepartments[index] = { ...mockDepartments[index], ...data };
        resolve(mockDepartments[index]);
      } else {
        reject(new Error('Department not found'));
      }
    }, 300);
  });
};

export const deleteDepartment = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockDepartments.findIndex((dept) => dept.id === id);
      if (index !== -1) {
        mockDepartments.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Department not found'));
      }
    }, 300);
  });
};

