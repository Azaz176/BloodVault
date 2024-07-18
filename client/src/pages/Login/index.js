import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const Login = () => {
  const [type, setType] = React.useState("donor");

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid p-5 gap-5 w-1/3 min-h-72"
        onFinish={onFinish}
      >
        <h1 className="uppercase mt-0 mb-0 p-0">
          <span className="text-primary">{type.toUpperCase()} - Login</span>
          <hr />
        </h1>

        <Form.Item className="-mt-5 p-0" label="Login As">
          <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
            className="col-span-2">
            <Radio value="donor">Donor</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="organization">Organization</Radio>
          </Radio.Group>
        </Form.Item>

        
           
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            
            <Form.Item label="Password" name="password" type="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input type="password" />
            </Form.Item>
  
        <Button type="primary" className="bg-blue-900" htmlType="submit">
          Login
        </Button>

        <Link
          to="/register"
          className="text-center text-blue-900 font-bold "
        >
          Don't have an account? Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
