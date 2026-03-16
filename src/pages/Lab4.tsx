import { Form, Input, Button, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

function Bai1(){
    const {mutate, isSuccess, isPending} = useMutation({
        mutationFn: async (data: any)=>{
            const res = await axios.post("http://localhost:3000/categories", data);
            return res.data
        }
    });
    const onFinish = (values: any)=>{
        console.log("Success:", values);
        mutate(values);
    }
    return(
        <Form layout="vertical" onFinish={onFinish} style={{maxWidth: 500}}>
            <Form.Item
            label="Danh mục"
            name="title"
            rules={[
                {required: true, message: "Vui lòng nhập danh mục"}
            ]}>
                <Input/>
            </Form.Item>

            <Form.Item
            label="Mô tả"
            name="description"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
            label="Trạng thái"
            name="active"
            >
              <Select
              options={[
                {
                    value: "1",
                    label: "Hiện"
                },
                {
                    value: "2",
                    label: "Ẩn"
                }
              ]}/>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isPending}>Thêm danh mục</Button>
            {isSuccess && <p>Categories submitted successfully!!</p>}
        </Form>
    )
}

function Bai2(){
    type Category = {
        title: string;
        description: string;
    };
    const {mutate, isSuccess, isPending} = useMutation({
        mutationFn: async (data: Category)=>{
            const res = await axios.post("http://localhost:3000/categories", data);
            return res.data
        }
    });
    const onFinish = (values: Category)=>{
        console.log("Success:", values);
        mutate(values);
    }
    return(
        <Form layout="vertical" onFinish={onFinish} style={{maxWidth: 500}}>
            <Form.Item
            label="Danh mục"
            name="title"
            rules={[
                {required: true, message: "Vui lòng nhập danh mục"}
            ]}>
                <Input/>
            </Form.Item>

            <Form.Item
            label="Mô tả"
            name="description"
            >
                <Input.TextArea rows={3}/>
            </Form.Item>

            <Form.Item
            label="Trạng thái"
            name="active"
            >
              <Select
              options={[
                {
                    value: "1",
                    label: "Hiện"
                },
                {
                    value: "2",
                    label: "Ẩn"
                }
              ]}/>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isPending}>Thêm danh mục</Button>
            {isSuccess && <p>Categories submitted successfully!!</p>}
        </Form>
    )
}

function Bai4() {
    type Category = {
        title: string;
        description: string;
    };
    const [story, setStory] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const onFinish = (values: any) => {
        setStory(values);
    };
    const getCategories = async () => {
        const { data } = await axios.get("http://localhost:3000/categories");
        setCategories(data);
    };
    useEffect(() => {
        getCategories();
    }, []);
  
    return (
      <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>
        {JSON.stringify(story)}
        <Form.Item
          label="Tên truyện" name="title">
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Tác giả" name="slug">
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung" name="content">
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh bìa" name="image">
          <Input />
        </Form.Item>

        <Form.Item label="Danh mục" name="category">
            <Select
                options={categories.map((item) => ({
                value: item.title,
                label: item.title
                }))}
            />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit">Đăng bài</Button>
        </Form.Item>
      </Form>
    );
};

function Lab4() {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-left font-bold">Bài 1</h1>
          <Bai1 />
        </div>
        <div>
          <h1 className="text-left font-bold">Bài 2</h1>
          <Bai2 />
        </div>
        <div>
          <h1 className="text-left font-bold">Bài 3</h1>
          <Bai4 />
        </div>
      </div>
    );
  }
  
export default Lab4;