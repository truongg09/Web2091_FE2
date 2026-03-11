import { Layout, Menu, Table, Button, Modal, Form, Input } from "antd";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

function Lab1() {

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([
    { key: 1, name: "Ngô Quang Trường", email: "truong09@gmail.com", role: "Admin" },
  ]);

  const [form] = Form.useForm();

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
  ];

  const onFinish = (values:any) => {
    const newUser = {
      key: users.length + 1,
      ...values
    };

    setUsers([...users, newUser]);
    setOpen(false);
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "70vh" }}>

      <Sider>
        <div className="mt-4">
            <Menu
            theme="dark"
            mode="inline"
            items={[
                { key: 1, label: "Trang chủ" },
                { key: 2, label: "Users" },
            ]}
            />
        </div>
      </Sider>

      <Layout>

        <Header style={{ color: "white", fontSize: 20, background: "#1677ff"  }}>
          Quản lý tài khoản
        </Header>

        <Content style={{ padding: 20}}>

            <div className="flex justify-end mb-5">
                <Button type="primary" onClick={() => setOpen(true)}>
                Add User
                </Button>
            </div>

          <Table columns={columns} dataSource={users} />

          <Modal
            title="Add User"
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
          >
            <Form form={form} layout="vertical" onFinish={onFinish}>

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>

              <Form.Item label="Role" name="role">
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>

            </Form>
          </Modal>

        </Content>
      </Layout>
    </Layout>
  );
}

export default Lab1;