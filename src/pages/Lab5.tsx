import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, Table, Button, Popconfirm, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Lab5(){
    const [search, setSearch] = useState("");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getAllStories"],
        queryFn: async () => {
          const res = await axios.get("http://localhost:3000/stories");
          return res.data;
        },
    });

    const qc = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
          await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
          toast.success("Xóa truyện thành công!");
          qc.invalidateQueries({ queryKey: ["getAllStories"] });
        },
    });
    const columns = [
        {
            title: "Tên truyện",
            dataIndex: "title",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            render: (src: string) => <Image src={src} height={100} />,
        },
        {
            title: "Ngày thêm",
            dataIndex: "createdAt",
            render: (createdAt: string) => new Date(createdAt).toLocaleDateString("vi-VN"),
        },
        {
            title: "Action",
            render: (_: any, record: any) => (
              <>
                <Popconfirm
                  title="Xóa truyện"
                  description="Bạn có chắc chắn muốn xóa không?"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => mutate(record.id)}
                >
                  <Button danger>DEL</Button>
                </Popconfirm>
                <Button type="primary">
                  <Link to={`/edit/${record.id}`}>Edit</Link>
                </Button>
              </>
            ),
            
          },
    ];
    
    const filteredData = data?.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    
    if (isError) {
        return <div>Có lỗi xảy ra</div>;
    }
    return(
      <>
        <Input placeholder="Tìm theo tên truyện..." onChange={(e) => setSearch(e.target.value)} style={{display:"flex",marginBottom:16, maxWidth: 200}}/>
        <Table columns={columns} dataSource={filteredData} loading={isLoading} pagination={{pageSize:5}}/>
      </>
    );
}

export default Lab5;