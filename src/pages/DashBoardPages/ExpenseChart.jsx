import React from "react";
import ExpensePieChart from "../../components/ExpensePieChart";
import ExpenseLineChart from "../../components/ExpenseLineChart";


const ExpenseChart = () => {
  return (
    <section className="w-11/12 mx-auto py-8 space-y-10">
      <ExpensePieChart></ExpensePieChart>
      <ExpenseLineChart></ExpenseLineChart>
    </section>
  );
};

export default ExpenseChart;
