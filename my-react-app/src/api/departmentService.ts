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

import axiosInstance from './axiosInstance';

export const getDepartments = async (params: DepartmentListParams): Promise<DepartmentListResponse> => {
  const response = await axiosInstance.get<DepartmentListResponse>('/departments', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
    },
  });
  return response.data;
};

export const getDepartmentById = async (id: number): Promise<Department> => {
  const response = await axiosInstance.get<Department>(`/departments/${id}`);
  return response.data;
};

export const createDepartment = async (data: Omit<Department, 'id' | 'employeeCount' | 'managerName'>): Promise<Department> => {
  const response = await axiosInstance.post<Department>('/departments', data);
  return response.data;
};

export const updateDepartment = async (id: number, data: Partial<Department>): Promise<Department> => {
  const response = await axiosInstance.put<Department>(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/departments/${id}`);
};

