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
  InputNumber,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  type Department,
} from '../../api/departmentService';

const { Search } = Input;
const { TextArea } = Input;

const DepartmentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch departments
  const { data: departmentsData, isLoading } = useQuery({
    queryKey: ['departments', pagination.current, pagination.pageSize, searchText],
    queryFn: () =>
      getDepartments({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText || undefined,
      }),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      message.success('Tạo phòng ban thành công!');
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: () => {
      message.error('Tạo phòng ban thất bại!');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Department> }) =>
      updateDepartment(id, data),
    onSuccess: () => {
      message.success('Cập nhật phòng ban thành công!');
      setIsModalOpen(false);
      setEditingDepartment(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: () => {
      message.error('Cập nhật phòng ban thất bại!');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      message.success('Xóa phòng ban thành công!');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: () => {
      message.error('Xóa phòng ban thất bại!');
    },
  });

  const handleAdd = () => {
    setEditingDepartment(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Department) => {
    setEditingDepartment(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingDepartment) {
        updateMutation.mutate({ id: editingDepartment.id, data: values });
      } else {
        createMutation.mutate(values as Omit<Department, 'id'>);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên phòng ban',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trưởng phòng',
      dataIndex: 'managerName',
      key: 'managerName',
      render: (name: string) => name || '-',
    },
    {
      title: 'Số nhân viên',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      render: (count: number) => count || 0,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_: any, record: Department) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa phòng ban"
            description="Bạn có chắc chắn muốn xóa phòng ban này?"
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
          placeholder="Tìm kiếm phòng ban..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          onSearch={handleSearch}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
          Thêm phòng ban
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={departmentsData?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: departmentsData?.total || 0,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} phòng ban`,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingDepartment ? 'Sửa phòng ban' : 'Thêm phòng ban'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingDepartment(null);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên phòng ban"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }]}
          >
            <Input placeholder="Nhập tên phòng ban" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <TextArea rows={4} placeholder="Nhập mô tả phòng ban" />
          </Form.Item>

          <Form.Item name="managerId" label="ID Trưởng phòng">
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập ID trưởng phòng (tùy chọn)"
              min={1}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentList;

