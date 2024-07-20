import React, { useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAndInputValidation } from "../../utils/helpers";
const Login = () => {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      // console.log("Form values:", values);
      const response = await LoginUser(values);
      // console.log("API Response:", response);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      console.error("Error:", error);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
          <Radio.Group
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="col-span-2"
          >
            <Radio value="donor">Donor</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="organization">Organization</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={getAndInputValidation()}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          type="password"
          rules={getAndInputValidation()}
        >
          <Input type="password" />
        </Form.Item>

        <Button type="primary" className="bg-blue-900" htmlType="submit">
          Login
        </Button>

        <Link to="/register" className="text-center text-blue-900 font-bold ">
          Don't have an account? Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
