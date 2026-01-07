import { useState } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
  InputNumber,
  Upload,
  Avatar,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  type Employee,
} from '../../api/employeeService';
import { getDepartments } from '../../api/departmentService';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/currency';

const { Search } = Input;

const EmployeeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch employees
  const { data: employeesData, isLoading } = useQuery({
    queryKey: ['employees', pagination.current, pagination.pageSize, searchText],
    queryFn: () =>
      getEmployees({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText || undefined,
      }),
  });

  // Fetch departments for select
  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments({}),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      message.success('Tạo nhân viên thành công!');
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: () => {
      message.error('Tạo nhân viên thất bại!');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Employee> }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      message.success('Cập nhật nhân viên thành công!');
      setIsModalOpen(false);
      setEditingEmployee(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: () => {
      message.error('Cập nhật nhân viên thất bại!');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      message.success('Xóa nhân viên thành công!');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: () => {
      message.error('Xóa nhân viên thất bại!');
    },
  });

  const handleAdd = () => {
    setEditingEmployee(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Employee) => {
    setEditingEmployee(record);
    form.setFieldsValue({
      ...record,
      departmentId: record.departmentId,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Handle image upload (mock - in real app, upload to server first)
      if (values.avatarFileList && values.avatarFileList.length > 0) {
        const file = values.avatarFileList[0];
        if (file.originFileObj) {
          // In real app, upload file and get URL
          values.avatar = URL.createObjectURL(file.originFileObj);
        }
      }
      delete values.avatarFileList;

      if (editingEmployee) {
        updateMutation.mutate({ id: editingEmployee.id, data: values });
      } else {
        createMutation.mutate(values as Omit<Employee, 'id'>);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => (
        <Avatar src={avatar} icon={<UploadOutlined />} size={40} />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => <Tag color="blue">{position}</Tag>,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'departmentName',
      key: 'departmentName',
    },
    {
      title: 'Lương',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => formatCurrency(salary),
    },
    {
      title: 'Ngày vào làm',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_: any, record: Employee) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa nhân viên"
            description="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Tìm kiếm nhân viên..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          onSearch={handleSearch}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
          Thêm nhân viên
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={employeesData?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: employeesData?.total || 0,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} nhân viên`,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingEmployee ? 'Sửa nhân viên' : 'Thêm nhân viên'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingEmployee(null);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ departmentId: undefined }}
        >
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Chức vụ"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ!' }]}
          >
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item
            name="departmentId"
            label="Phòng ban"
            rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
          >
            <Select
              placeholder="Chọn phòng ban"
              options={departmentsData?.data.map((dept) => ({
                label: dept.name,
                value: dept.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="salary"
            label="Lương"
            rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập lương"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="joinDate"
            label="Ngày vào làm"
            rules={[{ required: true, message: 'Vui lòng nhập ngày vào làm!' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="avatarFileList" label="Ảnh đại diện">
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeList;

