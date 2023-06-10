import { Card, Table } from "antd";
import AppHeader from "../Components/Header";
import { useState } from "react";

function Home() {
  <AppHeader />;
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("app");
  const columns = [
    {
      title: "RowHead",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Home phone",
      colSpan: 2,
      dataIndex: "tel",
    },
    {
      title: "Phone",
      colSpan: 0,
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      tel: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      tel: "0571-22098333",
      phone: 18889898888,
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "London No. 2 Lake Park",
    },
    {
      key: "5",
      name: "Jake White",
      age: 18,
      tel: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
    },
  ];

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  const tabList = [
    {
      key: "tab1",
      tab: "Numbness of the anterior/lateral part of the thigh",
    },
    {
      key: "tab2",
      tab: "Numbness of the radial fingers (1-3)",
    },
  ];
  const contentList = {
    tab1: (
      <p>
        <Table dataSource={data} columns={columns} />;
      </p>
    ),
    tab2: <p>content2</p>,
  };
  const tabListNoTitle = [
    {
      key: "article",
      label: "article",
    },
    {
      key: "app",
      label: "app",
    },
    {
      key: "project",
      label: "project",
    },
  ];
  const contentListNoTitle = {
    article: <p>article content</p>,
    app: (
      <p style={{ fontSize: "20px" }}>
        A decision support system for medical doctors, assistants, and students
        in the field of physical rehabilitation. It is developed with an
        algorithm that determines the appropriateness and sequence of tests
        conducted on patients during the rehabilitation stages, aiming to
        diagnose the condition with minimal tests and minimize the patient's
        involvement.
      </p>
    ),
    project: <p>project content</p>,
  };
  return (
    <>
      <Card
        style={{
          width: "100%",
        }}
        title="Welcome to the Medical Diagnosis Decision Support System!"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
      <br />
      <br />
      <Card
        style={{
          width: "100%",
        }}
        title="Data Sets"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
}

export default Home;
