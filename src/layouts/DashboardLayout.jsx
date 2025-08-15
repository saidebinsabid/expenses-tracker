import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaMoneyBillWave, FaListAlt, FaChartPie } from "react-icons/fa";

const DashboardLayout = () => {
 const userLinks = (
  <>
    <li className="border-t border-b border-white/20 py-2 font-semibold text-sm text-center uppercase text-gray-400">
      Track your Expense
    </li>
    <li>
      <NavLink
        to="/dashboard"
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
        to=""
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary border-b-2" : "text-white"
        }
      >
        <FaChartPie className="mr-2" /> Expense Chart
      </NavLink>
    </li>
  </>
);
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        {/* Navbar (Mobile only) */}

        <div className="navbar bg-[#18181b]/100 backdrop-blur-md w-full lg:hidden shadow-md">
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
        <ul className="menu bg-[#18181b]/100 backdrop-blur-md min-h-screen w-72 p-4 text-white space-y-1">
          {/* Logo */}
          <NavLink to="/">
            <div className="flex items-center gap-2 mb-4">
            </div>
          </NavLink>
          {userLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
