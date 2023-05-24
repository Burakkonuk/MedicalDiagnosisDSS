
import 'antd/dist/reset.css';
import Axios from 'axios'
import { Badge, Descriptions, Layout,Card,Col,Row} from 'antd';
import { useEffect, useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;



function Profile() {
  const [data,setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/getAllUser",{
      method:"GET",
    }).then((res) => res.json())
    .then((data) => {
      setData(data.data);
    });


  }, []);

  return (
    <Row gutter={5}>
      {data.map(x => {
    return(
      <>
    <Col span={5}>
      <Card title="Name" bordered={true}>
        {x.name}
      </Card>
    </Col>
    <Col span={5}>
      <Card title="Surname" bordered={true}>
      {x.lastname}
      </Card>
    </Col>
    <Col span={5}>
      <Card title="E-mail" bordered={false}>
        {x.email}
      </Card>
    </Col>

    </>
    
    )

    
    })}
    
    
  </Row>
  );
}

export default Profile;
