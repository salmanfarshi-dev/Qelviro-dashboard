import React, { useState } from "react";
import {
  MdDashboard,
  MdOutlineCategory,
  MdOutlineInventory2,
  MdOutlineDiscount,
  MdMenu,
  MdClose,
  MdLogout,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../slices/UserinfoSlies";

const items = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    key: "sub1",
    label: "Products",
    icon: <AiFillProduct />,
    children: [
      { key: "/dashboard/addproduct", label: "Add Product" },
      { key: "/dashboard/viewproduct", label: "View Products" },
    ],
  },
  {
    key: "sub2",
    label: "Variants",
    icon: <SettingOutlined />,
    children: [
      { key: "/dashboard/createvarient", label: "Create Variant" },
      { key: "/dashboard/viewvarient", label: "View Variants" },
    ],
  },
  {
    key: "sub3",
    label: "Categories",
    icon: <MdOutlineCategory />,
    children: [
      { key: "/dashboard/createcategory", label: "Create Category" },
      { key: "/dashboard/viewcategory", label: "View Categories" },
    ],
  },
  {
    key: "sub4",
    label: "Sub Categories",
    icon: <MdOutlineInventory2 />,
    children: [
      {
        key: "/dashboard/createsubcategory",
        label: "Create Sub Category",
      },
      {
        key: "/dashboard/viewsubcategory",
        label: "View Sub Categories",
      },
    ],
  },
  {
    key: "sub5",
    label: "Discounts",
    icon: <MdOutlineDiscount />,
    children: [
      {
        key: "/dashboard/creatediscount",
        label: "Create Discount",
      },
      {
        key: "/dashboard/viewdiscount",
        label: "View Discounts",
      },
    ],
  },
];

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openMenus, setOpenMenus] = useState(["sub1"]);

  const data = useSelector((state) => state.userinfo.value);

  const user =
    data?.data?.user ||
    data?.user ||
    data?.data?.data?.user ||
    data?.data ||
    data ||
    {};

  const userName =
    user?.name ||
    user?.fullName ||
    user?.fullname ||
    user?.username ||
    user?.user?.name ||
    user?.data?.name ||
    "User";

  const userEmail = user?.email || user?.user?.email || user?.data?.email || "";

  const currentPath = location.pathname;

  const toggleMenu = (key) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const openDrawer = () => {
    setDrawerVisible(true);

    requestAnimationFrame(() => {
      setMobileOpen(true);
    });
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = (event) => {
    if (event.target === event.currentTarget && !mobileOpen) {
      setDrawerVisible(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeDrawer();
  };

  const handleLogout = () => {
    dispatch(logout(JSON.stringify(data?.data ?? data)));
    closeDrawer();
    navigate("/login", { replace: true });
  };

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col bg-[#0b1120] text-slate-100">
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600">
          <MdDashboard size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-extrabold tracking-tight">
            Admin<span className="text-blue-400">Panel</span>
          </h2>

          <p className="mt-1 text-[9px] font-bold tracking-[2px] text-slate-500">
            MANAGEMENT SYSTEM
          </p>
        </div>

        <button
          type="button"
          onClick={closeDrawer}
          aria-label="Close sidebar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:rotate-90 hover:bg-white/10 hover:text-white md:hidden"
        >
          <MdClose size={23} />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-between px-6 pb-2 pt-6">
        <span className="text-[10px] font-extrabold tracking-[1.8px] text-slate-500">
          MAIN MENU
        </span>
        <MdKeyboardArrowDown size={18} className="text-slate-600" />
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 pb-4 [scrollbar-color:#334155_transparent] [scrollbar-width:thin]">
        {items.map((item) => {
          const isActive = currentPath === item.key;

          const isChildActive = item.children?.some(
            (child) => child.key === currentPath,
          );

          const isOpen = openMenus.includes(item.key) || Boolean(isChildActive);

          if (item.children) {
            return (
              <div key={item.key}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.key)}
                  aria-expanded={isOpen}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-medium transition-all ${
                    isChildActive
                      ? "bg-blue-500/10 text-blue-300"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl ${
                      isChildActive
                        ? "bg-blue-500/15 text-blue-400"
                        : "text-slate-500 group-hover:text-blue-300"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {isOpen ? (
                    <MdKeyboardArrowDown size={19} />
                  ) : (
                    <MdKeyboardArrowRight size={19} />
                  )}
                </button>

                {isOpen && (
                  <div className="ml-7 mt-1 space-y-1 border-l border-slate-700/70 pb-1 pl-4">
                    {item.children.map((child) => {
                      const childActive = currentPath === child.key;

                      return (
                        <button
                          type="button"
                          key={child.key}
                          onClick={() => handleNavigation(child.key)}
                          className={`relative flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs transition ${
                            childActive
                              ? "bg-blue-500/15 font-semibold text-blue-300"
                              : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                          }`}
                        >
                          {childActive && (
                            <span className="absolute -left-[21px] h-5 w-0.5 rounded-full bg-blue-400" />
                          )}

                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              childActive ? "bg-blue-400" : "bg-slate-600"
                            }`}
                          />
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              type="button"
              key={item.key}
              onClick={() => handleNavigation(item.key)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] font-semibold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/40"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-500 group-hover:text-blue-300"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 bg-[#090e1a] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-extrabold text-white">
            {String(userName).charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-white">
              {userName}
            </h3>

            <p className="mt-1 truncate text-[11px] text-slate-400">
              {userEmail || "Logged-in User"}
            </p>

            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Account
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-red-400/10 bg-red-500/[0.06] px-4 py-3 text-sm font-semibold text-red-300 transition-all hover:border-red-400/30 hover:bg-red-500 hover:text-white"
        >
          <MdLogout size={20} />
          Logout
        </button>

        <p className="mt-3 text-center text-[10px] text-slate-600">
          © 2026 Admin Panel
        </p>
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-40 flex min-h-[66px] items-center justify-between gap-3 border-b border-slate-800 bg-[#0b1120] px-4 text-white md:hidden">
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Open sidebar"
          aria-expanded={mobileOpen}
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 text-slate-200 shadow-sm transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-600 hover:text-white active:scale-90"
        >
          <MdMenu
            size={24}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </button>

        <div className="flex flex-1 items-center justify-center gap-2 text-lg font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
            <MdDashboard size={20} />
          </span>
          <span>
            Admin<span className="text-blue-400">Panel</span>
          </span>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-extrabold">
          {String(userName).charAt(0).toUpperCase()}
        </div>
      </header>

      <aside className="sticky top-0 hidden h-dvh w-[270px] shrink-0 overflow-hidden border-r border-slate-800 md:block">
        {sidebarContent}
      </aside>

      {drawerVisible && (
        <div
          className={`fixed inset-0 z-[100] flex md:hidden ${
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          onClick={closeDrawer}
          aria-hidden={!mobileOpen}
        >
          <div
            className={`absolute inset-0 bg-slate-950/70 backdrop-blur-[3px] transition-opacity duration-300 ease-out ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          <aside
            id="mobile-sidebar-drawer"
            onClick={(event) => event.stopPropagation()}
            onTransitionEnd={handleDrawerTransitionEnd}
            className={`relative z-10 h-dvh w-[min(290px,88vw)] overflow-hidden shadow-[20px_0_60px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
