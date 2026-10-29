
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const data = await axios.post(
        "http://localhost:3000/api/v1/authentication/forgetpassword",
        {
          findemail: values.findemail,
        }
      );

      if (data.data.success === "found data") {
        toast.success("Account found successfully!");

        setTimeout(() => {
          navigate(
            `/resetpassword/${encodeURIComponent(data.data.email)}`
          );
        }, 1000);
      } else if (data.data.error === "not found") {
        toast.error("Your Account is not Found");
      } else {
        toast.error(data.data.error || "Something went wrong");
      }

      console.log(data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong. Please try again."
      );

      console.log("Forget Password Error:", error);
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

          
          <div className="hidden w-1/2 items-center justify-center md:flex">
            <img
              src="/registration.png"
              alt="Forgot Password"
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 md:px-6 lg:px-10">
            <div className="mb-7">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
                🔐
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Forgot Password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                No worries! Enter the email address associated with your{" "}
                <span className="font-semibold text-blue-600">
                  Qelviro
                </span>{" "}
                account to continue resetting your password.
              </p>
            </div>

            <Form
              name="forgetpassword"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              requiredMark={false}
            >
              <Form.Item
                label={
                  <span className="font-medium text-slate-700">
                    Email Address
                  </span>
                }
                name="findemail"
                className="mb-5!"
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
                  type="email"
                  size="large"
                  placeholder="Enter your registered email"
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
                    hover:bg-blue-600!
                    hover:shadow-[0_0_15px_rgba(37,99,235,0.7),0_0_40px_rgba(37,99,235,0.4)]!
                  "
                >
                  Continue
                </Button>
              </Form.Item>

              <p className="text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Back to Login
                </Link>
              </p>

              <p className="mt-5 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 transition hover:text-blue-800"
                >
                  Sign Up
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

export default ForgetPassword;
