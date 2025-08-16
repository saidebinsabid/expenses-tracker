// ExpensePieChart.jsx
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const categories = ["Food", "Transport", "Shopping", "Others"];

const ExpensePieChart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchExpenses = async () => {
      try {
        const res = await axiosSecure.get("/expenses");
        const expenses = res.data || [];

        const chartData = categories.map((cat) => {
          const total = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, item) => sum + Number(item.amount), 0);
          return { name: cat, value: total };
        });

        setData(chartData);
      } catch (err) {
        console.error(err);
        setData([]);
      }
    };

    fetchExpenses();
  }, [user, axiosSecure]);

  if (!data.length || data.every((d) => d.value === 0)) {
    return <p className="text-center py-10">No expenses to display</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Expenses by Category</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpensePieChart;
