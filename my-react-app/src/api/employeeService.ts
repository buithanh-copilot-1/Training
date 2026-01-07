export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  departmentId: number;
  departmentName?: string;
  avatar?: string;
  salary?: number;
  joinDate?: string;
}

export interface EmployeeListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface EmployeeListResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
}

// Mock data - trong thực tế sẽ gọi API thật
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    position: 'Developer',
    departmentId: 1,
    departmentName: 'IT',
    salary: 15000000,
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0901234568',
    position: 'Designer',
    departmentId: 2,
    departmentName: 'Design',
    salary: 12000000,
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    phone: '0901234569',
    position: 'Manager',
    departmentId: 1,
    departmentName: 'IT',
    salary: 20000000,
    joinDate: '2022-11-10',
  },
];

export const getEmployees = async (params: EmployeeListParams): Promise<EmployeeListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockEmployees];
      
      // Search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower) ||
            emp.phone.includes(searchLower) ||
            emp.position.toLowerCase().includes(searchLower)
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

export const getEmployeeById = async (id: number): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const employee = mockEmployees.find((emp) => emp.id === id);
      if (employee) {
        resolve(employee);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 300);
  });
};

export const createEmployee = async (data: Omit<Employee, 'id'>): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmployee: Employee = {
        ...data,
        id: mockEmployees.length + 1,
      };
      mockEmployees.push(newEmployee);
      resolve(newEmployee);
    }, 300);
  });
};

export const updateEmployee = async (id: number, data: Partial<Employee>): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockEmployees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        mockEmployees[index] = { ...mockEmployees[index], ...data };
        resolve(mockEmployees[index]);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 300);
  });
};

export const deleteEmployee = async (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockEmployees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Employee not found'));
      }
    }, 300);
  });
};

