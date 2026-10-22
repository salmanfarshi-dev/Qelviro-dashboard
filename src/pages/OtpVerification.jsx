import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

function OtpVerification() {

  const param = useParams()
  const nevigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const data = await axios.post(
      "http://localhost:3000/api/v1/authentication/otp",
      {
       
        email: param.email,
        otp: values.otp,
      },
      {
        headers: {
          Authorization: "123456789",
        },
      },
    );

    if (data.data.success == "OTP Match") {
      toast.success("Verification successfully");
      form.resetFields();
      nevigate("/login");
    } else if (data.data.error == "OTP Not Match") {
      toast.error("OTP Not Match");
    } else if (data.data.error == "Invalid Creandiential") {
      toast.error("Invalid Creandiential");
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
        className="absolute inset-0 h-full w-full object-cover blur-lg scale-105"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-50 flex h-full w-full items-center justify-center px-4">
        <div className="flex w-full max-w-xl flex-col items-center overflow-hidden rounded-3xl bg-white/75 p-5 shadow-2xl backdrop-blur-md md:flex-row md:p-8 lg:p-10">
          <div className="w-full  md:px-6 lg:px-10">
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
                label={<span className="font-medium text-slate-700">OTP</span>}
                name="otp"
                className="mb-4!"
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your OTP"
                  className="rounded-xl!"
                />
              </Form.Item>

              <Form.Item className="mb-4! ">
                <div className="flex items-center gap-3 md:gap-6 justify-center">
                  <Button type="primary" htmlType="submit">Send</Button>
                 <Link to="/">
                  <Button color="danger" variant="outlined">
                    Cencel
                  </Button>
                 </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
        <Toaster position="top-center" />
    </div>
  );
}

export default OtpVerification;
