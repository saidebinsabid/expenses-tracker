import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="min-h-[calc(100vh-512px)]">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
