
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

function Home() {
  const data = useSelector((state) => state.userinfo.value);

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-dvh w-full bg-slate-100 md:flex">
      <Sidebar />

      <main className="min-h-0 min-w-0 flex-1">
        <div className="w-full min-w-0 p-3 sm:p-5 lg:p-8">
          <div className="min-h-[calc(100dvh-6rem)] min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
