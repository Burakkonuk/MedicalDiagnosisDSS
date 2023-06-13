import { Card, Table } from "antd";
import AppHeader from "../Components/Header";
import { useState } from "react";

function Home() {
  <AppHeader />;
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState("app");
  const columns = [
    {
      title: "PREDIAGNOSES",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title:
        "LESION OF THE LATERAL CUTANEOUS NERVE OF THE THIGH (MERALGIA PARESTHETICA)",
      dataIndex: "name",
    },
    {
      title: "FEMORAL NERVE LESION",
      dataIndex: "age",
    },
    {
      title: "L2-4 RADICULOPATHY",
      dataIndex: "tel",
    },
  ];
  const data = [
    {
      key: "STRATEGY",
      name: "Demonstrate abnormality of the lateral cutaneous nerve of the thigh at the superior anterior iliac spine",
      age: "Demonstrate neurogenic EMG findings in muscles innervated by the femoral nerve and abnormal SNC findings in n.saphenus and r.cutaneus femoris anterior -differentiate from lumbar plexus lesion and L2-L4 radiculopathy",
      tel: "demonstrate neurogenic EMG findings in L2-L4 innervated muscles - examine muscles innervated by the adjacent roots",
    },
    {
      key: "sensory nerve conduction studies",
      name: "",
      age: "",
      tel: "",
    },
    {
      key: "SNCS: n.fem. cut. Lateralis (4)",
      name: "P",
      age: "N",
      tel: "",
    },
    {
      key: "SNCS: r.cutaneus femoris anterior (4)",
      name: "",
      age: "P",
      tel: "",
    },
    {
      key: "SNCS: n. Saphenus (4)",
      name: "",
      age: "P",
      tel: "N",
    },
    {
      key: "SNCS: n. Suralis (2)",
      name: "",
      age: "N",
      tel: "",
    },
    {
      key: "motor nerve conduction studies",
      name: "",
      age: "",
      tel: "",
    },
    {
      key: "MNCS: n.femoralis (2)",
      name: "",
      age: "P",
      tel: "N",
    },
    {
      key: "electromyography",
      name: "",
      age: "",
      tel: "",
    },
    {
      key: "EMG: m. Add. Magnus (3)",
      name: "N",
      age: "N",
      tel: "P",
    },
    {
      key: "EMG: m. Quadriceps (3)",
      name: "N",
      age: "P",
      tel: "P",
    },
    {
      key: "EMG: m. Tibialis ant.(3)",
      name: "",
      age: "N",
      tel: "N",
    },
    {
      key: "EMG: paravertebral L2-4 (4)",
      name: "",
      age: "N",
      tel: "P",
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
      tab: "Numbness of the radial fingers [1-3] (Coming Soon)",
      disabled: true,
    },
  ];
  const contentList = {
    tab1: (
      <p>
        <Table dataSource={data} columns={columns} pagination={false} />
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
