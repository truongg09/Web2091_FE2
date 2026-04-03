import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCRUD = (key: string) => {
    const qc = useQueryClient();
    const navigate = useNavigate();

    const useList = useQuery({
        queryKey: [key],
        queryFn: async () => {
        const res = await axios.get(`http://localhost:3000/${key}`);
        return res.data;
        },
    });

    const useAdd = useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.post(`http://localhost:3000/${key}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Thêm thành công");
            qc.invalidateQueries({ queryKey: [key] });
        },
        onError: () => {
            toast.error("Thêm thất bại");
        },
    });

    const useDelete = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/${key}/${id}`);
        },
        onSuccess: () => {
            toast.success("Xóa thành công");
            qc.invalidateQueries({ queryKey: [key] });
        },
        onError: () => {
            toast.error("Xóa thất bại");
        },
    });

    const uaeUpdate = useMutation({
        mutationFn: async ({ id, data }: any) => {
            const res = await axios.put(`http://localhost:3000/${key}/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Cập nhật thành công");
            qc.invalidateQueries({ queryKey: [key] });
            navigate(`/${key}`);
        },
        onError: () => {
            toast.error("Cập nhật thất bại");
        },
    });

  return {
    useList,
    useAdd,
    useDelete,
    uaeUpdate,
  };
};
