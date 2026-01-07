import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Mock API Server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor để thêm token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Xử lý lỗi network (không có response từ server)
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        message.error('Request timeout. Vui lòng thử lại!');
      } else if (error.message === 'Network Error') {
        message.error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!');
      } else {
        message.error('Đã xảy ra lỗi kết nối. Vui lòng thử lại!');
      }
      return Promise.reject(error);
    }

    // Lấy thông báo lỗi từ server
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'Đã xảy ra lỗi. Vui lòng thử lại!';

    // Hiển thị toast thông báo lỗi
    message.error(errorMessage);

    return Promise.reject(error);
  }
);

export default axiosInstance;

