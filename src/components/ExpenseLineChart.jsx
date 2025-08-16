import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ExpenseLineChart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchExpenses = async () => {
      try {
        const res = await axiosSecure.get("/expenses");
        const expenses = res.data || [];
        const categories = ["Food", "Transport", "Shopping", "Others"];
        const chartData = categories.map((cat) => {
          const total = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, item) => sum + Number(item.amount), 0);
          return { category: cat, amount: total };
        });

        setData(chartData);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    };

    fetchExpenses();
  }, [user, axiosSecure]);

  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2 text-center">
        Expense Trend by Category
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;
