import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const categories = ["Food", "Transport", "Shopping", "Others"];

const AddExpense = ({ refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const expenseInfo = {
      title: data.title,
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date,
      email: user?.email,
      created_at: new Date(),
    };

    try {
      await axiosSecure.post("/expenses", expenseInfo);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Expense added successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      reset();
      refetch?.();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: `Could not add expense - ${
          err?.response?.data?.message || err.message
        }`,
      });
    }
  };

  const inputClass =
    "input input-bordered w-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary";
  const selectClass =
    "select select-bordered w-full bg-gray-100 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary";
  const labelClass = "text-gray-700 font-medium";

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Add New Expense
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Expense title"
              className={inputClass}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className={labelClass}>Amount</label>
            <input
              type="number"
              {...register("amount", { required: "Amount is required" })}
              placeholder="Enter amount"
              className={inputClass}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className={selectClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className={inputClass}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
