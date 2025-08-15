import React from "react";
import AddExpense from "./AddExpense";
import Loading from "../../components/Loading";

const DashboardHome = () => {
  const loading = false; 

  if (loading) {
    return <Loading></Loading>;
  }
  return <AddExpense></AddExpense>;
};

export default DashboardHome;
