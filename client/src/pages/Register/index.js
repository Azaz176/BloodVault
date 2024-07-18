import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function Register() {
  const [type, setType]= React.useState('donor')

  return (

    <div className="flex h-screen items-center justify-center bg-primary">
      <Form layout="vertical" className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2">

          <h1 className="col-span-2 uppercase" >
            <span className="text-primary">Register - DONAR</span>
            <hr/>
          </h1>
          
          {type==='donar' && <>
            <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone">
            <Input />
          </Form.Item>
          <Form.Item label="Password">
            <Input />
          </Form.Item>
          </>}

          <Button type="primary" className="col-span-2 bg-blue-900">Register</Button>

          <Link to="/login" className="col-span-2 text-center text-blue-900 font-bold ">
            Already have an account? Login
          </Link>
      </Form>
    </div>
  );
}

export default Register;
