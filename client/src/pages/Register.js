
import 'antd/dist/reset.css';
import { Button, Form, Input, Row,Typography, Card } from 'antd';
import Axios from 'axios'
import {useNavigate} from 'react-router-dom';
import '../App.css'

function Register() {


  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values.name)
    Axios.post('http://localhost:5000/register', {
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
    <div className='registerContainer'>
    <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>

      <Card className='regCardApp'>
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{width: '400px', height: '150px',marginLeft:'-40px',marginTop:'10px'}}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Typography.Title style={{marginLeft:'150px',paddingBottom:'20px',paddingTop:'20px'}}>Register!</Typography.Title>
    <Form.Item
      label={<span style={{fontWeight:'500'}}>Name</span>}
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
      label={<span style={{fontWeight:'500'}}>Last Name</span>}
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
      label={<span style={{fontWeight:'500'}}>E-Mail</span>}
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
      label={<span style={{fontWeight:'500'}}>Password</span>}
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
      <Button type="primary" htmlType="submit" block>
        Register
      </Button>
      
    </Form.Item>
    <Form.Item>

    </Form.Item>
      </Form>
      </Card>
   

  </Row>
  </div>
  );
}

export default Register;
