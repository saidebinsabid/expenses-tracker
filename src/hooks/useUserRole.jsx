import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaUser, FaClock, FaBullhorn } from "react-icons/fa";
import logoImage from "../assets/website_logo.png";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
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

        {/* Page content */}
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
              <img className="w-10 h-10" src={logoImage} alt="logo" />
              <h1 className="text-2xl font-semibold tracking-wide">
                Court<span className="text-primary">Nest</span>
              </h1>
            </div>
          </NavLink>

          {/* User Panel Links */}
          <li className="border-t border-b border-white/20 py-2 font-semibold text-sm text-center uppercase text-gray-400">
            User Panel
          </li>
          <li>
            <NavLink
              to="/dashboard/user/profile"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-primary border-b-2"
                  : "text-white"
              }
            >
              <FaUser className="mr-2" /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/pending-booking"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-primary border-b-2"
                  : "text-white"
              }
            >
              <FaClock className="mr-2" /> Pending Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/update-announcement"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-primary border-b-2"
                  : "text-white"
              }
            >
              <FaBullhorn className="mr-2" /> Announcements
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
