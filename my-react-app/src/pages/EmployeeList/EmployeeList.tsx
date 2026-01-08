import { useState } from "react";
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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  type Employee,
} from "../../api/employeeService";
import { getDepartments } from "../../api/departmentService";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/currency";

const { Search } = Input;

const EmployeeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const avatar = Form.useWatch("avatar", form);
  // Fetch employees
  const { data: employeesData, isLoading } = useQuery({
    queryKey: [
      "employees",
      pagination.current,
      pagination.pageSize,
      searchText,
    ],
    queryFn: () =>
      getEmployees({
        page: pagination.current,
        limit: pagination.pageSize,
        search: searchText || undefined,
      }),
  });

  // Fetch departments for select
  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments({}),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      message.success("Tạo nhân viên thành công!");
      setIsModalOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error("Create employee error:", error);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Employee> }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      message.success("Cập nhật nhân viên thành công!");
      setIsModalOpen(false);
      setEditingEmployee(null);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error("Update employee error:", error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      message.success("Xóa nhân viên thành công!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      // Toast đã được hiển thị bởi axios interceptor
      // Chỉ log để debug nếu cần
      console.error("Delete employee error:", error);
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

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Đảm bảo avatar (base64 string) được gửi đi khi thêm mới hoặc cập nhật
      const submitData = {
        ...values,
        avatar: values.avatar || undefined, // Avatar là base64 string hoặc undefined
      };
      
      if (editingEmployee) {
        updateMutation.mutate({ id: editingEmployee.id, data: submitData });
      } else {
        createMutation.mutate(submitData as Omit<Employee, "id">);
      }
    } catch (error) {
      console.error("Validation failed:", error);
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
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      width: 80,
      render: (avatar: string) => (
        <Avatar src={avatar} icon={<UploadOutlined />} size={40} />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
      render: (position: string) => <Tag color="blue">{position}</Tag>,
    },
    {
      title: "Phòng ban",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      render: (salary: number) => formatCurrency(salary),
    },
    {
      title: "Ngày vào làm",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date: string) => formatDate(date),
    },
    {
      title: "Thao tác",
      key: "action",
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
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          placeholder="Tìm kiếm nhân viên..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          size="large"
        >
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
        title={editingEmployee ? "Sửa nhân viên" : "Thêm nhân viên"}
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
            rules={[
              { required: true, message: "Vui lòng nhập tên nhân viên!" },
            ]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Chức vụ"
            rules={[{ required: true, message: "Vui lòng nhập chức vụ!" }]}
          >
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item
            name="departmentId"
            label="Phòng ban"
            rules={[{ required: true, message: "Vui lòng chọn phòng ban!" }]}
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
            rules={[{ required: true, message: "Vui lòng nhập lương!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập lương"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="joinDate"
            label="Ngày vào làm"
            rules={[{ required: true, message: "Vui lòng nhập ngày vào làm!" }]}
          >
            <Input type="date" />
          </Form.Item>

            <Form.Item name="avatar" label="Ảnh đại diện">
             <div style={{ position: "relative", width: 104, height: 104 }}>
               {avatar ? (
                 <>
                   <Avatar
                     src={avatar}
                     size={100}
                     style={{ display: "block" }}
                   />
                   <Upload
                     showUploadList={false}
                     maxCount={1}
                     beforeUpload={(file) => {
                       getBase64(file as File).then((base64) => {
                         form.setFieldValue("avatar", base64);
                       });
                       return false; // Ngăn upload tự động
                     }}
                   >
                     <div
                       style={{
                         position: "absolute",
                         bottom: 0,
                         right: 0,
                         background: "#1890ff",
                         borderRadius: "50%",
                         width: 32,
                         height: 32,
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         cursor: "pointer",
                         color: "white",
                         fontSize: 16,
                       }}
                       title="Thay đổi ảnh"
                     >
                       ✏️
                     </div>
                   </Upload>
                   <Button
                     type="text"
                     danger
                     size="small"
                     icon={<DeleteOutlined />}
                     onClick={() => {
                       form.setFieldValue("avatar", undefined);
                     }}
                     style={{
                       position: "absolute",
                       top: 0,
                       right: 0,
                       padding: 0,
                       width: 24,
                       height: 24,
                       minWidth: 24,
                       background: "rgba(255, 77, 79, 0.8)",
                       borderRadius: "50%",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                     }}
                     title="Xóa ảnh"
                   />
                 </>
               ) : (
                 <Upload
                   listType="picture-card"
                   maxCount={1}
                   beforeUpload={(file) => {
                     getBase64(file as File).then((base64) => {
                       form.setFieldValue("avatar", base64);
                     });
                     return false; // Ngăn upload tự động
                   }}
                 >
                   <div>
                     <UploadOutlined />
                     <div style={{ marginTop: 8 }}>Upload</div>
                   </div>
                 </Upload>
               )}
             </div>
           </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeList;
