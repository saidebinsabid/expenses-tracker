import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { FaMoneyBillWave, FaListAlt, FaChartPie, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

 const userLinks = (
  <>
    <li className="border-t border-b border-white/20 py-2 font-semibold text-sm text-center text-gray-400">
      Track your own Expense
    </li>
    <li>
      <NavLink
        to="add-expense"
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary border-b-2" : "text-white"
        }
      >
        <FaMoneyBillWave className="mr-2" /> Add Expense
      </NavLink>
    </li>
    <li>
      <NavLink
        to="expense-list"
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary border-b-2" : "text-white"
        }
      >
        <FaListAlt className="mr-2" /> Expense List
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/dashboard/chart"
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary border-b-2" : "text-white"
        }
      >
        <FaChartPie className="mr-2" /> Expense Chart
      </NavLink>
    </li>
  </>
);

const handleLogout = async () => {
  try {
    await logoutUser();
    toast.success("You have successfully logged out!");
    navigate("/auth/login");
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error("Failed to logout. Try again.");
  }
};

  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        {/* Navbar (Mobile only) */}

        <div className="navbar bg-[#18181b] backdrop-blur-md w-full lg:hidden shadow-md">
          <div className="flex-none">
            <label htmlFor="my-drawer-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current text-white hover:text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="text-white font-bold text-lg ml-2">Dashboard</div>
        </div>
        {/* Outlet / Page content */}
        <div className="flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-[#18181b] backdrop-blur-md min-h-screen w-72 p-4 text-white flex flex-col justify-between">
  <div>
    {/* Logo */}
    <NavLink to="/">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-xl  font-bold uppercase">Expense Tracker</span>
      </div>
    </NavLink>

    {/* User Links */}
    {userLinks}
  </div>

  {/* Logout Button */}
  <li className="mt-auto">
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 text-red-500 hover:text-white font-semibold p-2 rounded-md"
    >
      <FaSignOutAlt /> Logout
    </button>
  </li>
</ul>

      </div>
    </div>
  );
};

export default DashboardLayout;
