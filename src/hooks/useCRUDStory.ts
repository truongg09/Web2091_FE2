import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCRUDStory = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();

    const list = useQuery({
        queryKey: ["stories"],
        queryFn: async () => {
        const res = await axios.get("http://localhost:3000/stories");
        return res.data;
        },
    });

    const add = useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.post("http://localhost:3000/stories", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Thêm thành công");
            qc.invalidateQueries({ queryKey: ["stories"] });
        },
        onError: () => {
            toast.error("Thêm thất bại");
        },
    });

    const remove = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
            toast.success("Xóa thành công");
            qc.invalidateQueries({ queryKey: ["stories"] });
        },
        onError: () => {
            toast.error("Xóa thất bại");
        },
    });

    const update = useMutation({
        mutationFn: async ({ id, data }: any) => {
            const res = await axios.put(`http://localhost:3000/stories/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Cập nhật thành công");
            qc.invalidateQueries({ queryKey: ["stories"] });
            navigate("/lab5");
        },
        onError: () => {
            toast.error("Cập nhật thất bại");
        },
    });

  return {
    list,
    add,
    remove,
    update,
  };
};
