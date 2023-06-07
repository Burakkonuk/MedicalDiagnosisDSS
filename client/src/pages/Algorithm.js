import Axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  Dropdown,
  message,
  Button,
  Space,
  Col,
  Row,
  Modal,
  Select,
} from "antd";
import { jsPDF } from "jspdf";
import "../App.css";

function Algorithm() {
  const [result, setResult] = useState([]);
  const [test, setTest] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [counter, setCounter] = useState(0);
  const [StageResult, setStageResult] = useState({});
  const [currentsonuc, setCurrentSonuc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Option } = Select;

  const onExport = () => {
    var doc = new jsPDF();
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

    const array = localStorage.getItem("matrixResult").split(",");
    const pageCount = doc.internal.pages.length;
    for (let i = 1; i < pageCount; i++) {
      doc.setPage(i);
      doc.setFont("Roboto-Bold");
      doc.setFontSize(12);
      doc.setTextColor("#000000");

      doc.setFontSize(10);
      doc.setTextColor("#000D7A");

      doc.text(100, 20, array, "center");
    }
    doc.save();
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/temp", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var obje = JSON.parse(result);
        setResult(obje);
        setTest(obje[1][0].name);
        if (!localStorage.getItem("testCounter")) {
          localStorage.setItem("testCounter", 1);
        }
        if (!localStorage.getItem("matrixResult")) {
          localStorage.setItem("matrixResult", "");
        }
        console.log(obje);
        // Find the index of the "Priorities" column
        const prioritiesIndex = obje[0].indexOf("Priorities");

        // Get the unique test groups from the first column (excluding the header)
        const testGroups = Array.from(
          new Set(obje.slice(1).map((row) => row[0].testGroupName))
        );

        // Initialize variables for storing the test and highest mean priority
        let firstTestX = null;
        let highestMeanPriority = -Infinity;

        // Iterate over the unique test groups
        for (const testGroup of testGroups) {
          // Filter the rows that belong to the current test group
          const filteredRows = obje
            .slice(1)
            .filter((row) => row[0].testGroupName === testGroup);

          // Calculate the mean priority for the current test group
          const meanPriority =
            filteredRows.reduce((sum, row) => sum + row[prioritiesIndex], 0) /
            filteredRows.length;

          // Check if the mean priority in the current test group is the new highest mean priority
          if (meanPriority > highestMeanPriority) {
            highestMeanPriority = meanPriority;

            // Find the test with the highest priority within the current test group
            const testWithHighestPriority = filteredRows.find(
              (row) =>
                row[prioritiesIndex] ===
                Math.max(...filteredRows.map((row) => row[prioritiesIndex]))
            );

            firstTestX = testWithHighestPriority[0];
            setTest(firstTestX);
          }
        }

        function deleteColumn(matrix, columnIndex) {
          for (let i = 0; i < matrix.length; i++) {
            matrix[i].splice(columnIndex, 1);
          }
          return matrix;
        }

        findNextTest(obje);

        let arr = [];
        for (let index = 1; index < obje.length; index++) {
          const element = obje[index];
          arr.push(element);
        }
        setDiseases(arr);
        setSelectedKey("x");
      })
      .catch((error) => console.log("error", error));
  }, []);

  const items = [
    {
      label: "P (Pathologic)",
      key: "1",
    },
    {
      label: "N (Neurogenic)",
      key: "2",
    },
    {
      label: "N/A (Non/Applicable)",
      key: "3",
    },
  ];
  function findNextTest(obje) {
    const [testNames, ...rows] = obje;

    const firstTest = test;
    const firstTestIndex = 6;
    const rowX = rows[5];
    const userInput = prompt("Enter N, P, or N/A:");
    const columnsToBeDeleted = [];

    for (let index = 1; index < rowX.length - 1; index++) {
      if (userInput != rowX[index]) {
        columnsToBeDeleted.push(index);
      }
    }
    console.log(columnsToBeDeleted);
    for (let index = 0; index < columnsToBeDeleted.length; index++) {
      obje = deleteColumn(obje, columnsToBeDeleted[index]);
      if (columnsToBeDeleted[index + 1] != null) {
        columnsToBeDeleted[index + 1] = columnsToBeDeleted[index + 1] - 1;
      }
    }
    console.log(obje);
  }
  const onClick = ({ key }) => {
    const obje = {};
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (element.key == key) {
        setSelectedKey(element.label);
        obje[currentsonuc] = element.label;
      }
    }
    const temp = StageResult;
    temp[currentsonuc] = obje[currentsonuc];
    setStageResult(temp);
    localStorage.setItem(currentsonuc, obje[currentsonuc]);
  };
  const onSubmit = () => {
    let flag = true;
    setSelectedKey("x");
    for (let index = 0; index < diseases.length; index++) {
      const element = diseases[index][0];
      if (!localStorage.getItem(element)) {
        flag = false;
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-5">
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-light text-center">
              {test.length > 0
                ? test[localStorage.getItem("testCounter")]
                : "Test"}
            </h3>
          </div>
        </div>
        <Row>
          {
            <>
              <Col span={8}></Col>
              <Col span={8}>
                <Card
                  className="w-100"
                  title={"What is the result of the test   '" + test + "'"}
                  bordered={false}
                  style={{ width: 300 }}
                >
                  <Dropdown
                    menu={{
                      selectable: true,
                      items,
                      onClick,
                    }}
                  >
                    <a
                      onClick={(e) => {
                        e.preventDefault();

                        //setCurrentSonuc(item[0]);
                      }}
                    >
                      <Space>
                        <div>
                          {selectedKey === "x" ? (
                            <span>Please select the result of the test</span>
                          ) : (
                            <span>{JSON.stringify(selectedKey)}</span>
                          )}
                        </div>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>

                  {/* <Select
                                    onClick={onClick}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="p">P</Option>
                                    <Option value="n">N</Option>
                                    <Option value="n/a">N/A</Option>
                                </Select> */}

                  <div>
                    <p></p>
                  </div>
                </Card>
              </Col>
            </>
          }
        </Row>
        <div className="row mt-5 justify-content-center">
          <div className="col-12 w-25">
            <Button
              onClick={() => {
                onSubmit();
              }}
              type="primary"
              block
            >
              Go to next Stage
            </Button>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-12 w-25">
            <Button
              onClick={() => {
                onExport();
              }}
              type="primary"
              block
            >
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Warning"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Please select the result of the test. </h3>
      </Modal>
    </>
  );
}

export default Algorithm;
