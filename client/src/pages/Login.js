import "antd/dist/reset.css";
import {
  Button,
  Form,
  Input,
  Row,
  Card,
  Typography,
  Divider,
  message,
} from "antd";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";
function Login() {
  let navigate = useNavigate();

  const onClick = () => {
    navigate("/register");
  };
  const onFinish = (values) => {
    Axios.post("http://localhost:5000/login", {
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        localStorage.setItem("userEmail", res.data.data.email);
        localStorage.setItem("userName", res.data.data.name);
        localStorage.setItem("userLastname", res.data.data.lastname);
        navigate("/home");
        navigate(0);
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.message);
        } else {
          message.error("An error occurred. Please try again.");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="mainContainer">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Card className="cardApp">
          <Form
            className="formApp"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{ width: "400px", height: "150px", marginLeft: "-50px" }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Typography.Title
              style={{
                marginLeft: "150px",
                paddingBottom: "20px",
                paddingTop: "20px",
              }}
            >
              Welcome!
            </Typography.Title>

            <Form.Item
              label={<span style={{ fontWeight: "500" }}>E-Mail</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontWeight: "500" }}>Password</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Divider>or</Divider>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button type="primary" onClick={onClick} block>
                Register
              </Button>
            </Form.Item>
            <Form.Item></Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
}

export default Login;
