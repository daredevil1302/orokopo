import "./Signup.scss";
import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, notification } from "antd";
import Title from "../../Components/Title/Title";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { showNotification } from "../../Notification";
import { useHistory } from "react-router-dom";
const Signup = () => {
  //   const history = useHistory();

  //   useEffect(() => {
  //     if (user) {
  //       history.push("/items");
  //     }
  //   }, []);

  const history = useHistory();

  const { Option } = Select;

  const handleSignup = ({
    name,
    surname,
    street,
    city,
    zip,
    phone,
    date,
    email,
    password,
  }) => {
    axios
      .post(`http://localhost:5000/auth/signup`, {
        name: name,
        surname: surname,
        street: street,
        city: city,
        zip: zip,
        phone: phone,
        date: date,
        email: email,
        password: password,
      })
      .then(() => {
        history.push("/items");
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const handleDate = (date) => {
    const dateFinal = moment(date).format("YYYY-MM-DD");
  };

  return (
    <div>
      <Title title="Sign up" />
      <div className="form-content log-form">
        <Form
          name="normal_signup"
          className="login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={handleSignup}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
          >
            <Input
              //   prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: "Please enter your surname",
              },
            ]}
          >
            <Input
              //   prefix={<LockOutlined className="site-form-item-icon" />}

              placeholder="Surname"
            />
          </Form.Item>

          <Form.Item
            name="street"
            rules={[
              {
                required: true,
                message: "Please enter your street",
              },
            ]}
          >
            <Input
              //   prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Street"
            />
          </Form.Item>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please enter your city",
              },
            ]}
          >
            <Input
              //   prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="City"
            />
          </Form.Item>
          <Form.Item
            name="zip"
            rules={[
              {
                required: true,
                message: "Please enter your zip code",
              },
            ]}
          >
            <Input
              //   prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Zip code"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
          >
            <Input
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select style={{ width: 75 }}>
                    <Option value="385">+385</Option>
                    <Option value="386">+386</Option>
                  </Select>
                </Form.Item>
              }
              //   prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Phone"
            />
          </Form.Item>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please enter the date of your birth",
              },
            ]}
          >
            <DatePicker onChange={handleDate} className="date-picker" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item className="login-button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
