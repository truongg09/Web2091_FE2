import { Form, Input, Button, DatePicker } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const THL4 = () => {
  const {mutate, isSuccess, isPending} = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:3000/stories", data);

      return res.data;
    },

    onSuccess: () => {
      toast.success("Thêm truyện thành công");
    },

    onError: () => {
      toast.error("Có lỗi xảy ra");
    },
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    mutate({
      ...values,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item
        label="Tên truyện"
        name="title"
        rules={[{ required: true, message: "Nhập tên truyện" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Tác giả" name="author">
        <Input />
      </Form.Item>

      <Form.Item label="Image URL" name="image">
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Ngày thêm" name="createdAt">
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Thêm truyện
      </Button>
      {isSuccess && <p>Story submitted successfully!</p>}
    </Form>
  );
};

export default THL4;