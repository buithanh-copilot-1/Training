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

import axiosInstance from './axiosInstance';

export const getEmployees = async (params: EmployeeListParams): Promise<EmployeeListResponse> => {
  const response = await axiosInstance.get<EmployeeListResponse>('/employees', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
    },
  });
  return response.data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await axiosInstance.get<Employee>(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (data: Omit<Employee, 'id' | 'departmentName'>): Promise<Employee> => {
  const response = await axiosInstance.post<Employee>('/employees', data);
  return response.data;
};

export const updateEmployee = async (id: number, data: Partial<Employee>): Promise<Employee> => {
  const response = await axiosInstance.put<Employee>(`/employees/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/employees/${id}`);
};

export const uploadEmployeeAvatar = async (id: number, file: File): Promise<Employee> => {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await axiosInstance.post<Employee>(`/employees/${id}/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

