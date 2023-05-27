import Axios from 'axios'
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message,Button, Space, Col, Row, Modal  } from 'antd';


function Algorithm() {

    const [result,setResult] = useState([]);
    const [test,setTest] = useState('');
    const [diseases,setDiseases] = useState([]);
    const [counter,setCounter] = useState(0);
    const [StageResult,setStageResult] = useState({});
    const [currentsonuc,setCurrentSonuc] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKey,setSelectedKey] = useState({});
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        

        fetch("http://localhost:5000/temp", requestOptions)
        .then(response => response.text())
        .then(result => {
            const obje = JSON.parse(result);
            setResult(obje);
            setTest(obje[0]);
            if(!localStorage.getItem('testCounter')){
                localStorage.setItem('testCounter',1);
            }
            if(!localStorage.getItem('matrixResult')){
                localStorage.setItem('matrixResult',"");
            }
            // const obj =
            // {
            //     "n.fem. cut. Lateralis":{
            //         "Lesion of the lateral cutaneous nerve of the thigh":"P",
            //         "Lesion of the lateral cutaneous nerve of the thigh":"P",
            //         "Lesion of the lateral cutaneous nerve of the thigh":"P",
            //     }
            // };
            let arr = [];
            for (let index = 1; index < obje.length; index++) {
                const element = obje[index];
                arr.push(element);
            }
            setDiseases(arr);
        })
        .catch(error => console.log('error', error));
    }, [])
    
    const items = [
        {
          label: 'P',
          key: '1',
        },
        {
          label: 'N',
          key: '2',
        },
        {
          label: 'N/A',
          key: '3',
        },
      ];

    const onClick = ({key}) => {
        const obje = {};
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            if(element.key == key){
                obje[currentsonuc] = element.label;
            }
            
        }
        const temp = StageResult;
        temp[currentsonuc] = obje[currentsonuc];
        setStageResult(temp);
        localStorage.setItem(currentsonuc,obje[currentsonuc]);
    };
    const onSubmit =()=>{
        let flag = true;
        for (let index = 0; index < diseases.length; index++) {
            const element = diseases[index][0];
            if(!localStorage.getItem(element)){
                flag =false;
            }
        }
        if(Object.keys(StageResult).length == 3 || flag){
            var temp = localStorage.getItem('matrixResult');
            if(temp == ""){
                let temp2 = {};
                temp2[test[localStorage.getItem('testCounter')]] = StageResult;
                const myJSON = JSON.stringify(temp2);
                localStorage.setItem('matrixResult',myJSON)
            }
            else{
                let json_matrix = JSON.parse(temp);
                json_matrix[test[localStorage.getItem('testCounter')]] = StageResult;
                const myJSON = JSON.stringify(json_matrix);
                localStorage.setItem('matrixResult',myJSON)
            }
            for (let index = 0; index < diseases.length; index++) {
                const element = diseases[index][0];
                localStorage.removeItem(element);
            }
            var test_counter = +localStorage.getItem('testCounter')+1;
            localStorage.setItem('testCounter',test_counter);
            window.location.reload();
        }
        else{
            showModal();
        }
    }

    const row = (item) =>{
        
        return(
            <>
            { 
  
                item && item[0] &&
                <Col  span={8}>
                <Card className='w-100' title={item[0]} bordered={false} style={{ width: 300 }}>
                    <Dropdown
                        menu={{
                        selectable: true,
                        items,
                        onClick,
                        }}
                    >
                        <a onClick={(e) => {
                            e.preventDefault();
                            setCurrentSonuc(item[0]);
                        }}>
                        <Space>
                            Selceted Item
                            <DownOutlined />
                        </Space>
                        </a>
                    </Dropdown>
                    <div>
                    <p></p>
                    </div>
                    </Card>
                </Col>
            } 
            </>
        );
    }

    return (
        <>
        <div className='container-fluid bg-dark p-5'>
            <div className='row mb-5'>
                <div className='col-12'>
                    <h3 className='text-light text-center'>{test.length > 0 ? test[localStorage.getItem('testCounter')] : "Test"}</h3>
                </div>
            </div>
            <Row gutter={16}>
            {
                diseases.length > 0 && 
                diseases.map((item)=>{

                return( 
                
                    <>
                    {row(item)}
                    </>
                                
                )})
            }
            </Row>
            <div className='row mt-5 justify-content-center'>
                <div className='col-12 w-25'>
                    <Button onClick={()=>{onSubmit();}} type="primary" block>
                        Go to next Stage
                    </Button>                
                </div>
            </div>



        </div>
        <Modal title="Warning" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <h3>Please select value for items </h3>
        </Modal>

        </>
    );
  }

  export default Algorithm;