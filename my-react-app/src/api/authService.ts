export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Mock login - trong thực tế sẽ gọi API thật
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  // Demo: chỉ cần email và password bất kỳ
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser: User = {
        id: 1,
        name: 'Admin User',
        email: data.email,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      resolve({
        token: mockToken,
        user: mockUser,
      });
    }, 500);
  });
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

