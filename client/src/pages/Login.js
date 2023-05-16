
import 'antd/dist/reset.css';
import './App.css';
import { Button, Form, Input, Row, Card } from 'antd';
import Axios from 'axios'







function Login() {

  const onFinish = (values) => {

    Axios.post('http://localhost:5000/api/login', {
      email: values.email,
      password: values.password,
    }).then(() => {
      alert("successfull insert");
    })
  };  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>

      <Card >
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{width: '400px', height: '500px'}}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >


    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit"> 
        Login
      </Button>
      
    </Form.Item>
    <Form.Item>

    </Form.Item>
      </Form>
      </Card>
   

  </Row>

  );
}

export default Login;
