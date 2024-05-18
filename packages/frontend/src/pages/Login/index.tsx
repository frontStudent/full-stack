import React from "react";
import { Button, Form, Input } from "antd";
import axios from "utils/Request.ts";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const handleLogin = () => {
    form.validateFields().then((values) => {
      axios.post("/user/login", { ...values })
    });
  };

  const handleRegister = () => {
    form.validateFields().then((values) => {
      axios.post("/user/register", { ...values })
    });
  };
  return (
    <div>
      <Form name="loginForm" form={form}>
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Form>
      <Button onClick={handleRegister}>Register</Button>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};
export default Login;
