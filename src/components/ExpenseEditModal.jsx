import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const categories = ["Food", "Transport", "Shopping", "Others"];

const ExpenseEditModal = ({ expense, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: expense,
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      await axiosSecure.put(`/expenses/${expense._id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Expense updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      onClose();
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            placeholder="Amount"
            className="input input-bordered w-full"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}

          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEditModal;
