import React, {useEffect} from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { RegisterUser } from "../../apicalls/users";

const Register = () => {
  const [type, setType] = React.useState("donor");
  const navigate= useNavigate()

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      console.log("API Response:", response);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error(error.message);
    }
  };
  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  }, [])

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

        
          <Radio.Group onChange={(e) => setType(e.target.value)} value={type}
            className="col-span-2">
            <Radio value="donor">Donor</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="organization">Organization</Radio>
          </Radio.Group>
       

        {type === "donor" && (
          <>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
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
            <Form.Item label="Name" name="hospitalName" rules={[{ required: true, message: 'Please input the hospital name!' }]}>
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
            <Form.Item label="address" name="address" className="col-span-2">
              <TextArea/>
            </Form.Item>
          </>
        )}

        {type === "organization" && (
          <>
            <Form.Item label="Name" name="organizationName" rules={[{ required: true, message: 'Please input the organization name!' }]}>
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
            <Form.Item label="address" name="address" className="col-span-2">
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
