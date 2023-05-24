
import 'antd/dist/reset.css';
import { Button, Form, Input, Row, Card } from 'antd';
import Axios from 'axios'
import {useNavigate} from 'react-router-dom';


function Register() {


  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values.name)
    Axios.post('http://localhost:5000/api/register', {
      name: values.name, 
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    }).then(() => {
      alert("successfull insert");
      
    }).then(() =>{
        navigate("/login")
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
      label="name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input/>
    </Form.Item>


    <Form.Item
      label="lastname"
      name="lastname"
      rules={[
        {
          required: true,
          message: 'Please input your Surname!',
        },
      ]}
    >
      <Input />
    </Form.Item>

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
        Register
      </Button>
      
    </Form.Item>
    <Form.Item>

    </Form.Item>
      </Form>
      </Card>
   

  </Row>

  );
}

export default Register;
