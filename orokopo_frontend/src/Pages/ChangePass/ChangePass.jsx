import React from "react";
import "./ChangePass.scss";
import { useUser } from "../../UserContext";
import Title from "../../Components/Title/Title";

import { Form, Input, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { showNotification } from "../../Notification";

const ChangePass = () => {
  const history = useHistory();
  const handleChange = ({ password }) => {
    axios
      .patch("http://localhost:5000/auth/changepass", {
        password: password,
      })
      .then(() => {
        showNotification("Password successfully changed");
        history.push("/items");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Title title="Change Password" />
      <div className="form-content log-form">
        <Form
          name="change_pass"
          className="login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={handleChange}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input type="password" placeholder="New password" />
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
            <Input type="password" placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item className="login-button">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePass;
