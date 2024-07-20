import React, { useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAndInputValidation } from "../../utils/helpers";

const Register = () => {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      console.log("Form values:", values);
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false));
      console.log("API Response:", response);
      if (response.success) {
        message.success(response.message);
        navigate("/login")
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
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2 min-h-72"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase mt-0 mb-0 p-0">
          <span className="text-primary">
            {type.toUpperCase()} - Registration
          </span>
          <hr />
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donor">Donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>

        {type === "donor" && (
          <>
            {" "}
            <Form.Item
              label="Name"
              name="name"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={getAndInputValidation()}
            >
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
          </>
        )}

        {type === "hospital" && (
          <>
            <Form.Item
              label="Name"
              name="hospitalName"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item label="owner" name="owner" rules={getAndInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="website" name="website" rules={getAndInputValidation()}>
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
            <Form.Item label="address" name="address" className="col-span-2" rules={getAndInputValidation()}>
              <TextArea />
            </Form.Item>
          </>
        )}

        {type === "organization" && (
          <>
            <Form.Item
              label="Name"
              name="organizationName"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={getAndInputValidation()}
            >
              <Input />
            </Form.Item>
            <Form.Item label="owner" name="owner" rules={getAndInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="website" name="website" rules={getAndInputValidation()}>
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
            <Form.Item label="address" name="address" className="col-span-2" rules={getAndInputValidation()}>
              <TextArea />
            </Form.Item>
          </>
        )}

        <Button
          type="primary"
          className="col-span-2 bg-blue-900"
          htmlType="submit"
        >
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
};

export default Register;
