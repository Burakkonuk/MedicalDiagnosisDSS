
import 'antd/dist/reset.css';
import Axios from 'axios'
import { Badge, Descriptions, Layout,Card,Col,Row} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;



function Profile() {

  const [content,setContent] = useState("");


  let navigate = useNavigate();

  useEffect(() => {
    console.log("usefecetacaspaofk")    
    if(localStorage.getItem("userName")){
      console.log("ifin içi")  
      setContent(<Row gutter={5}>
    
      <Col span={5}>
        <Card title="Name" bordered={true}>
          {localStorage.getItem("userName")}
        </Card>
      </Col>
      <Col span={5}>
        <Card title="Surname" bordered={true}>
        {localStorage.getItem("userLastname")}
        </Card>
      </Col>
      <Col span={5}>
        <Card title="E-mail" bordered={false}>
          {localStorage.getItem("userEmail")}
        </Card>
      </Col>
      
    </Row>);
    }
    else{
      setContent(<div>x</div>)
      console.log("else içi")  
      navigate("/login")
    }

  }, []);

  return (
    <>
    {content}</>
  );
}

export default Profile;
