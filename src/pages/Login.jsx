import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate =  useNavigate()
  const onFinish = async (values) => {
    const data = await axios.post(
      "http://localhost:3000/api/v1/authentication/login",
      {
    
        email: values.email,
        password: values.password,
      }

    );

    if (data.data.success == "Login successfully") {
      toast.success("Login successfully");
      navigate("/home")
    } else if (data.data.error == "Invalid Creandiential") {
      toast.error("Invalid Creandiential");
    } 
    console.log(data.data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("faield :", errorInfo);
  };

  return (
    <>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Toaster />

    
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <p>Don't you account <Link className="text-green-400" to="/">Signup</Link> </p>
    </>
    
  );
}

export default Login;
