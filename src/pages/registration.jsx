import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

function Registration() {
  let navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const data = await axios.post(
        "http://localhost:3000/api/v1/authentication/registration",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: "123456789",
          },
        },
      );

      if (data.data.success === "data sent successfully") {
        toast.success("Registration successful!");
        form.resetFields();

        setTimeout(() => {
          navigate(`/otpverification/${encodeURIComponent(data.data.email)}`);
        }, 2000);
      } else if (data.data === "Data Already Existed") {
        toast.error("Data Already Existed");
      } else if (data.data === "valid email") {
        toast.error("Valid email required");
      } else {
        toast.error(
          typeof data.data === "string" ? data.data : "Registration failed",
        );
      }

      console.log(data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("failed :", errorInfo);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="/images.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover blur-sm scale-105"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-50 flex h-full w-full items-center justify-center px-4">
        <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-md md:flex-row md:p-8 lg:p-10">
          <div className="hidden w-1/2 items-center justify-center md:flex">
            <img
              src="/login.png"
              alt="Registration"
              className="w-full max-w-sm object-contain"
            />
          </div>

          <div className="w-full md:w-1/2 md:px-6 lg:px-10">
            <div className="mb-7">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create your account and start shopping with{" "}
                <span className="font-semibold text-blue-600">Qelviro</span>
              </p>
            </div>

            <Form
              form={form}
              name="registration"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <span className="font-medium text-slate-700">Username</span>
                }
                name="username"
                className="mb-4!"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your username"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-slate-700">
                    Email Address
                  </span>
                }
                name="email"
                className="mb-4!"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-slate-700">Password</span>
                }
                name="password"
                className="mb-5!"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item className="mb-4!">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className=" md:h-12! rounded-xl! border-0!  bg-blue-600! font-semibold! text-white! shadow-[0_0_10px_rgba(37,99,235,0.4),0_0_30px_rgba(37,99,235,0.25)]! transition-all! duration-300! hover:shadow-[0_0_15px_rgba(37,99,235,0.7),0_0_40px_rgba(37,99,235,0.4)]!
"
                >
                  Create Account
                </Button>
              </Form.Item>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default Registration;
