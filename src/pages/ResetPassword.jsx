import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/v1/authentication/resetpassword",
        {
          email: email,
          newpassword: values.password,
        },
      );

      if (response.data.success === "Password reset successfully") {
        toast.success("Password reset successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.error || "Password reset failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Password reset failed. Please try again.",
      );

      console.log("Reset Password Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/images.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-sm"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-md md:flex-row md:p-8 lg:p-10">
          <div className="flex w-full flex-col justify-center md:w-1/2 md:px-6 lg:px-10">
            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-1.125 0h11.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125H6.375c-.621 0-1.125-.504-1.125-1.125v-8.25c0-.621.504-1.125 1.125-1.125Z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Reset Password
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Create a new password for your{" "}
                <span className="font-semibold text-blue-600">Qelviro</span>{" "}
                account.
              </p>
            </div>

            <Form
              name="resetpassword"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item
                label={
                  <span className="font-medium text-slate-700">
                    New Password
                  </span>
                }
                name="password"
                className="mb-4!"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your new password"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="font-medium text-slate-700">
                    Confirm Password
                  </span>
                }
                name="confirmPassword"
                dependencies={["password"]}
                className="mb-5!"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Passwords do not match!"),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm your new password"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item className="mb-5!">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  className="
                    h-12!
                    rounded-xl!
                    border-0!
                    bg-blue-600!
                    font-semibold!
                    text-white!
                    shadow-[0_0_10px_rgba(37,99,235,0.4),0_0_30px_rgba(37,99,235,0.25)]!
                    transition-all!
                    duration-300!
                    hover:bg-blue-700!
                    hover:shadow-[0_0_15px_rgba(37,99,235,0.7),0_0_40px_rgba(37,99,235,0.4)]!
                  "
                >
                  Reset Password
                </Button>
              </Form.Item>

              <p className="text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Login
                </Link>
              </p>
            </Form>
          </div>

          <div className="hidden w-1/2 items-center justify-center md:flex">
            <div className="text-center">
              <img
                src="/registration.png"
                alt="Reset Password"
                className="w-full max-w-sm object-contain"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-800">
                Secure Your Account
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Set a new password to keep your Qelviro account secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default ResetPassword;
