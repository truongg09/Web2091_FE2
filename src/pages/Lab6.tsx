import { Form, Input, Button, Spin, DatePicker } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useUpdateStory } from "../hooks/useUpdateStory";

const Lab6 = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/stories/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        createdAt: data.createdAt ? dayjs(data.createdAt) : null,
      });
    }
  }, [data, form]);

  const { mutate, isPending } = useUpdateStory();

  const onFinish = (values: any) => {
    mutate({
      id,
      data: {
        ...values,
        createdAt: values.createdAt
          ? values.createdAt.toISOString()
          : null,
      },
    });
  };

  if (isLoading) return <Spin />;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500 }}
      disabled={isPending}
    >
      <Form.Item name="title" label="Tên truyện" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="author" label="Tác giả" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="image" label="Link ảnh">
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="createdAt" label="Ngày thêm" rules={[{ required: true }]}>
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Cập nhật
      </Button>
    </Form>
  );
};

export default Lab6;