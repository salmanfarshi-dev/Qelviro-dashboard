import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spin } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { FiTag, FiFolder, FiUser, FiEdit2, FiTrash2 } from "react-icons/fi";

function ViewCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function allcategory() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/product/viewcategory",
        );

        const categories = response.data.map((item, index) => ({
          key: item._id,
          serial: index + 1,
          ownername: item.categoryownerid?.username || "Unknown",
          name: item.categoryname,
        }));

        setData(categories);
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    allcategory();
  }, []);

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 90,
      render: (serial) => (
        <span className="font-semibold text-slate-500">
          {String(serial).padStart(2, "0")}
        </span>
      ),
    },

    {
      title: "Owner Name",
      dataIndex: "ownername",
      key: "ownername",
      render: (name) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-600">
            <FiUser size={17} />
          </div>
          <span className="font-medium text-slate-700">{name}</span>
        </div>
      ),
    },

    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiTag size={19} />
          </div>
          <span className="font-semibold text-slate-700">{name}</span>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 180,
      render: () => (
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={<FiEdit2 size={14} />}
            className="rounded-lg! bg-blue-600! shadow-none!"
            size="middle"
          >
            Edit
          </Button>

          <Button
            danger
            icon={<FiTrash2 size={14} />}
            className="rounded-lg!"
            size="middle"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <FiFolder size={17} />
              Category Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              All Categories
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View all categories created by users.
            </p>
          </div>

          {/* Total Categories */}
          <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiFolder size={24} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Categories
              </p>
              <h2 className="text-2xl font-bold text-slate-800">
                {data.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiTag size={20} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Category List</h2>
              <p className="text-xs text-slate-500">All created categories</p>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex min-h-60 flex-col items-center justify-center gap-3">
                <Spin size="large" />
                <p className="text-sm text-slate-500">Loading categories...</p>
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={data}
                rowKey="key"
                scroll={{ x: 650 }}
                pagination={{
                  pageSize: 8,
                  showSizeChanger: true,
                  pageSizeOptions: ["8", "16", "32"],
                  showTotal: (total) => `Total ${total} categories`,
                }}
              />
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Category Management Dashboard
        </p>
      </div>
    </div>
  );
}

export default ViewCategory;
