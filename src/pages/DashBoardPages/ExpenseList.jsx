import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ExpenseEditModal from "../../components/ExpenseEditModal";
import Loading from "../../components/Loading";

const categories = ["All", "Food", "Transport", "Shopping", "Others"];

const ExpenseList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch all expenses
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/expenses");
      return res.data;
    },
  });

  // Delete expense
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Expense deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    },
  });

  // Filter expenses by category
  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") return expenses;
    return expenses.filter((exp) => exp.category === selectedCategory);
  }, [expenses, selectedCategory]);

  // Total expense
  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );
  }, [filteredExpenses]);

  // Delete confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This expense will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full p-4">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold">
          Total Expense:{" "}
          <span className="text-primary">
            ${isNaN(totalExpense) ? "0.00" : totalExpense.toFixed(2)}
          </span>
        </h2>

        <select
          className="select select-bordered w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Expenses Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full border-collapse text-center">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp, index) => (
                <tr
                  key={exp._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{exp.title}</td>
                  <td className="py-2 px-4">
                    ${Number(exp.amount || 0).toFixed(2)}
                  </td>
                  <td className="py-2 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditingExpense(exp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(exp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingExpense && (
        <ExpenseEditModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
        />
      )}
    </div>
  );
};

export default ExpenseList;
