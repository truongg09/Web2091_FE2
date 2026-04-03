import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateStory = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, data }: any) => {
      const res = await axios.patch(`http://localhost:3000/stories/${id}`,data);
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
};