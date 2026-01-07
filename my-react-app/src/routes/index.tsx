import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login/Login';
import EmployeeList from '../pages/EmployeeList/EmployeeList';
import DepartmentList from '../pages/DepartmentList/DepartmentList';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/employees" replace />,
      },
      {
        path: 'employees',
        element: <EmployeeList />,
      },
      {
        path: 'departments',
        element: <DepartmentList />,
      },
    ],
  },
]);

