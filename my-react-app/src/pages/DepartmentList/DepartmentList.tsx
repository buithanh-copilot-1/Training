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
// React Query hooks: dùng để quản lý data fetching và cache
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
  // State quản lý UI
  const [isModalOpen, setIsModalOpen] = useState(false); // Mở/đóng modal thêm/sửa
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null); // Phòng ban đang được sửa (null = đang thêm mới)
  const [searchText, setSearchText] = useState(''); // Từ khóa tìm kiếm
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // Phân trang: trang hiện tại và số items/trang
  const [form] = Form.useForm(); // Form instance từ Ant Design
  
  // useQueryClient: lấy query client để quản lý cache thủ công (invalidate, update, remove)
  const queryClient = useQueryClient();

  // ========== useQuery: Lấy danh sách phòng ban (GET request) ==========
  // useQuery tự động fetch dữ liệu và cache lại
  // Khi queryKey thay đổi → tự động refetch dữ liệu mới
  const { data: departmentsData, isLoading } = useQuery({
    // queryKey: định danh duy nhất cho query này trong cache
    // Mỗi khi pagination, pageSize, hoặc searchText thay đổi → queryKey thay đổi → tự động refetch
    // Ví dụ: ['departments', 1, 10, ''] khác với ['departments', 2, 10, ''] → cache riêng biệt
    queryKey: ['departments', pagination.current, pagination.pageSize, searchText],
    
    // queryFn: hàm gọi API để lấy dữ liệu
    queryFn: () =>
      getDepartments({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText || undefined,
      }),
  });
  // departmentsData: dữ liệu trả về từ API (có thể là { data: [], total: 0 })
  // isLoading: true khi đang fetch, false khi đã xong

  // ========== useMutation: Tạo phòng ban mới (POST request) ==========
  // useMutation dùng cho các thao tác thay đổi dữ liệu (POST, PUT, DELETE)
  // Không tự động chạy, phải gọi .mutate() để thực hiện
  const createMutation = useMutation({
    // mutationFn: hàm gọi API để tạo phòng ban
    mutationFn: createDepartment,
    
    // onSuccess: callback chạy khi tạo thành công
    onSuccess: () => {
      message.success('Tạo phòng ban thành công!');
      setIsModalOpen(false); // Đóng modal
      form.resetFields(); // Reset form về trạng thái ban đầu
      
      // invalidateQueries: đánh dấu tất cả query có key bắt đầu bằng 'departments' là lỗi thời
      // → Tự động refetch lại danh sách phòng ban để hiển thị item mới
      // → UI tự động cập nhật mà không cần refresh trang
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    
    // onError: callback chạy khi tạo thất bại
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error('Create department error:', error);
    },
  });
  // createMutation.mutate(data): gọi để thực hiện mutation
  // createMutation.isPending: true khi đang xử lý, false khi xong

  // ========== useMutation: Cập nhật phòng ban (PUT request) ==========
  const updateMutation = useMutation({
    // mutationFn: hàm gọi API để cập nhật phòng ban
    // Nhận vào { id, data } và gọi updateDepartment(id, data)
    mutationFn: ({ id, data }: { id: number; data: Partial<Department> }) =>
      updateDepartment(id, data),
    
    // onSuccess: callback chạy khi cập nhật thành công
    onSuccess: () => {
      message.success('Cập nhật phòng ban thành công!');
      setIsModalOpen(false); // Đóng modal
      setEditingDepartment(null); // Reset về trạng thái thêm mới
      form.resetFields(); // Reset form
      
      // invalidateQueries: làm mới cache → tự động refetch danh sách → UI cập nhật
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    
    // onError: callback chạy khi cập nhật thất bại
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error('Update department error:', error);
    },
  });
  // updateMutation.mutate({ id, data }): gọi để thực hiện mutation

  // ========== useMutation: Xóa phòng ban (DELETE request) ==========
  const deleteMutation = useMutation({
    // mutationFn: hàm gọi API để xóa phòng ban (nhận id làm tham số)
    mutationFn: deleteDepartment,
    
    // onSuccess: callback chạy khi xóa thành công
    onSuccess: () => {
      message.success('Xóa phòng ban thành công!');
      
      // invalidateQueries: làm mới cache → tự động refetch danh sách → item đã xóa biến mất khỏi UI
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    
    // onError: callback chạy khi xóa thất bại
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error('Delete department error:', error);
    },
  });
  // deleteMutation.mutate(id): gọi để thực hiện mutation

  // ========== Event Handlers ==========
  
  // Mở modal để thêm phòng ban mới
  const handleAdd = () => {
    setEditingDepartment(null); // Không có phòng ban nào đang được sửa
    form.resetFields(); // Reset form về trống
    setIsModalOpen(true); // Mở modal
  };

  // Mở modal để sửa phòng ban
  const handleEdit = (record: Department) => {
    setEditingDepartment(record); // Lưu phòng ban đang được sửa
    form.setFieldsValue(record); // Điền dữ liệu vào form
    setIsModalOpen(true); // Mở modal
  };

  // Xóa phòng ban
  const handleDelete = (id: number) => {
    // Gọi mutation để xóa (sẽ tự động invalidate cache và refetch)
    deleteMutation.mutate(id);
  };

  // Xử lý submit form (thêm mới hoặc cập nhật)
  const handleSubmit = async () => {
    try {
      // Validate form trước khi submit
      const values = await form.validateFields();

      // Nếu đang sửa → gọi updateMutation
      // Nếu đang thêm mới → gọi createMutation
      if (editingDepartment) {
        updateMutation.mutate({ id: editingDepartment.id, data: values });
      } else {
        createMutation.mutate(values as Omit<Department, 'id'>);
      }
    } catch (error) {
      // Validation failed → không làm gì (Ant Design sẽ hiển thị lỗi)
      console.error('Validation failed:', error);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (value: string) => {
    setSearchText(value); // Cập nhật từ khóa tìm kiếm
    setPagination({ ...pagination, current: 1 }); // Reset về trang 1
    // → queryKey thay đổi → useQuery tự động refetch với từ khóa mới
  };

  // Xử lý thay đổi phân trang (chuyển trang, đổi số items/trang)
  const handleTableChange = (newPagination: any) => {
    setPagination({
      current: newPagination.current, // Trang mới
      pageSize: newPagination.pageSize, // Số items/trang mới
    });
    // → queryKey thay đổi → useQuery tự động refetch dữ liệu trang mới
  };

  // ========== Định nghĩa cột cho bảng ==========
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
      render: (name: string) => <Tag color="blue">{name}</Tag>, // Hiển thị tên dưới dạng Tag màu xanh
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
      render: (name: string) => name || '-', // Nếu không có tên → hiển thị '-'
    },
    {
      title: 'Số nhân viên',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      render: (count: number) => count || 0, // Nếu không có → hiển thị 0
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      // render: custom render cho cột này
      render: (_: any, record: Department) => (
        <Space size="middle">
          {/* Nút Sửa: mở modal với dữ liệu của record này */}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          {/* Nút Xóa: hiển thị Popconfirm trước khi xóa */}
          <Popconfirm
            title="Xóa phòng ban"
            description="Bạn có chắc chắn muốn xóa phòng ban này?"
            onConfirm={() => handleDelete(record.id)} // Xác nhận → gọi handleDelete
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

  // ========== Render UI ==========
  return (
    <div>
      {/* Header: Thanh tìm kiếm và nút thêm mới */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        {/* Input tìm kiếm: khi search → gọi handleSearch → queryKey thay đổi → refetch */}
        <Search
          placeholder="Tìm kiếm phòng ban..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          onSearch={handleSearch}
        />
        {/* Nút thêm mới: mở modal để thêm phòng ban */}
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large">
          Thêm phòng ban
        </Button>
      </div>

      {/* Bảng hiển thị danh sách phòng ban */}
      <Table
        columns={columns}
        dataSource={departmentsData?.data || []} // Dữ liệu từ useQuery (departmentsData?.data)
        loading={isLoading} // Hiển thị loading spinner khi đang fetch
        rowKey="id" // Key duy nhất cho mỗi row
        pagination={{
          current: pagination.current, // Trang hiện tại
          pageSize: pagination.pageSize, // Số items/trang
          total: departmentsData?.total || 0, // Tổng số phòng ban (từ API)
          showSizeChanger: true, // Cho phép đổi số items/trang
          showTotal: (total) => `Tổng ${total} phòng ban`,
        }}
        onChange={handleTableChange} // Khi đổi trang → gọi handleTableChange → queryKey thay đổi → refetch
      />

      {/* Modal thêm/sửa phòng ban */}
      <Modal
        title={editingDepartment ? 'Sửa phòng ban' : 'Thêm phòng ban'} // Title thay đổi theo mode
        open={isModalOpen} // Mở/đóng modal
        onOk={handleSubmit} // Khi click "Lưu" → validate và gọi mutation
        onCancel={() => {
          // Khi click "Hủy" → đóng modal và reset
          setIsModalOpen(false);
          setEditingDepartment(null);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={600}
        // confirmLoading: hiển thị loading khi đang tạo/sửa (đang chờ API response)
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        {/* Form nhập thông tin phòng ban */}
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên phòng ban"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban!' }, ]}
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

