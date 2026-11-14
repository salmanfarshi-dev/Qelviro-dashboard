import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Form, Input } from "antd";
import { FiTag, FiPlus } from "react-icons/fi";
import { useSelector} from "react-redux"

function CreateCategory() {

const userinfo = useSelector(state => state.userinfo.value);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const categoryname = values.categoryname.trim();
    const categoryownerid= userinfo.id

    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/product/createcategory",
        {
          categoryname,
          categoryownerid
        },
      );

      if (data.data.success) {
        toast.success(data.data.message);
        form.resetFields();
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong!",
      );

      console.log(error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <Toaster position="top-right" />

      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiTag size={30} />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Create Category
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add a new category to your store
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={
                <span className="font-semibold text-slate-700">
                  Category Name
                </span>
              }
              name="categoryname"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please enter category name!",
                },
                {
                  min: 2,
                  message: "Category name must be at least 2 characters!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<FiTag className="mr-2 text-slate-400" />}
                placeholder="Enter category name"
                className="h-12 rounded-xl!"
                maxLength={50}
              />
            </Form.Item>

            {/* Create Button */}
            <Form.Item className="mb-0! mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                icon={<FiPlus />}
                className="
                  h-12!
                  rounded-xl!
                  border-0!
                  bg-blue-600!
                  font-semibold!
                  text-white!
                  shadow-lg!
                  shadow-blue-500/25!
                  transition-all!
                  duration-300!
                  hover:bg-blue-700!
                  hover:shadow-blue-500/40!
                "
              >
                Create Category
              </Button>
            </Form.Item>
          </Form>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Organize your products with categories
        </p>
      </div>
    </div>
  );
}

export default CreateCategory;
