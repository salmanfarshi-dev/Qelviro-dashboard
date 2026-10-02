import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

function App() {
  const onFinish =async values => {

 
const data = await axios.post("http://localhost:3000/api/v1/authentication/registration",{
  username: values.username,
  email: values.email,
  password: values.password
}) 


    console.log(values.username);
    console.log(values.email);
    console.log(values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("faield :", errorInfo);
  };

  return (
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
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
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
  );
}

export default App;
