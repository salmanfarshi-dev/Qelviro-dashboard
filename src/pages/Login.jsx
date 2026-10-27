import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activeuserinfo } from "../slices/UserinfoSlies";
import { useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state.userinfo.value);

  const onFinish = async (values) => {
    const data = await axios.post(
      "http://localhost:3000/api/v1/authentication/login",
      {
        email: values.email,
        password: values.password,
      },
    );

    if (data.data.success == "Login successfully") {
      toast.success("Login successfully");
      navigate("/home");

      dispatch(activeuserinfo(JSON.stringify(data.data)));
    } else if (data.data.error == "Invalid Creandiential") {
      toast.error("Invalid Creandiential");
    } else if (data.data.error == "Email verification failed") {
      toast.error("Email verification failed");
    }

    console.log(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("failed :", errorInfo);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="/images.jpg"
        alt=""
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-sm"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-50 flex h-full w-full items-center justify-center px-4">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur-md md:flex-row md:p-8 lg:p-10">
          <div className="flex w-full flex-col justify-center md:w-1/2 md:px-6 lg:px-10">
            <div className="mb-7">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Login to your{" "}
                <span className="font-semibold text-blue-600">Qelviro</span>{" "}
                account
              </p>
            </div>

            <Form
              name="login"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
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
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  className="rounded-xl!"
                />
              </Form.Item>

              <div className="mb-5 -mt-2 flex justify-end">
                <Link
                  to="/forgetpassword"
                  className="text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item className="mb-4!">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
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
                  Login
                </Button>
              </Form.Item>

              <p className="text-center text-sm text-slate-500">
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

          <div className="hidden w-1/2 items-center justify-center md:flex">
            <img
              src="/public/registration.png"
              alt="Login"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default Login;
