import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const Register = () => {
  const [type, setType] = React.useState("donor");

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2 min-h-72"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase mt-0 mb-0 p-0">
          <span className="text-primary">{type.toUpperCase()} - Registration</span>
          <hr />
        </h1>

        <Form.Item className="col-span-2 -mt-5 p-0" label="Register As">
          <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
            className="col-span-2">
            <Radio value="donor">Donor</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="organization">Organization</Radio>
          </Radio.Group>
        </Form.Item>

        {type === "donor" && (
          <>
            <Form.Item label="Donor Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" type="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input type="password" />
            </Form.Item>
          </>
        )}

        {type === "hospital" && (
          <>
            <Form.Item label="Hospital Name" name="hospitalName" rules={[{ required: true, message: 'Please input the hospital name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="owner" name="owner">
              <Input/>
            </Form.Item>
            <Form.Item label="website" name="website">
              <Input/>
            </Form.Item>
            
            <Form.Item label="Password" name="password" type="password" rules={[{ required: true, message: 'Please input the password!' }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Address" name="Address" className="col-span-2">
              <TextArea/>
            </Form.Item>
          </>
        )}

        {type === "organization" && (
          <>
            <Form.Item label="Organization Name" name="organizationName" rules={[{ required: true, message: 'Please input the organization name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input the email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="owner" name="owner">
              <Input/>
            </Form.Item>
            <Form.Item label="website" name="website">
              <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password" type="password" rules={[{ required: true, message: 'Please input the password!' }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item label="Address" name="Address" className="col-span-2">
              <TextArea/>
            </Form.Item>
          </>
        )}

        <Button type="primary" className="col-span-2 bg-blue-900" htmlType="submit">
          Register
        </Button>

        <Link
          to="/login"
          className="col-span-2 text-center text-blue-900 font-bold "
        >
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;
