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
import "jspdf-autotable";
import "../App.css";
var obje = "";
var foundTestGroupNames = []; // TEST GROUPS TO BE DONE.
var currentTestGroup = "";
var testsToExport = [];
var testResults = [];
var currentPossible = [];
var testCounter = 0;
function Algorithm() {
  const [result, setResult] = useState([]);
  const [test, setTest] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [counter, setCounter] = useState(0);
  const [StageResult, setStageResult] = useState({});
  const [currentsonuc, setCurrentSonuc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});
  let testsToBeDone = [];

  function deleteColumn(matrix, columnIndex) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].splice(columnIndex, 1);
    }
    return matrix;
  }

  function deleteRow(matrix, row) {
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][0] === row) {
        matrix.splice(i, 1);
      }
    }
    return matrix;
  }

  function findTestGroups(matrix) {
    foundTestGroupNames = [];
    for (let i = 1; i < matrix.length; i++) {
      const firstElement = matrix[i][0];
      const testFinder = matrix[i][1];

      const testGroupName = firstElement.testGroupName;
      if (!foundTestGroupNames.includes(testGroupName) && testFinder != "N/A") {
        foundTestGroupNames.push(testGroupName);
      }
    }
  }

  let firstTest = test;
  let rowX = 0;

  function findNextTest(objectToChange) {
    const [testNames, ...rows] = objectToChange;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0].name === firstTest.name) {
        rowX = rows[i];
      }
    }

    const userInput = localStorage.getItem("currentSonuc");
    const columnsToBeDeleted = [];

    for (let index = 1; index < rowX.length - 1; index++) {
      if (userInput != rowX[index]) {
        columnsToBeDeleted.push(index);
      }
    }

    for (let index = 0; index < columnsToBeDeleted.length; index++) {
      objectToChange = deleteColumn(objectToChange, columnsToBeDeleted[index]);
      if (columnsToBeDeleted[index + 1] != null) {
        columnsToBeDeleted[index + 1] = columnsToBeDeleted[index + 1] - 1;
      }
    }

    deleteRow(obje, test);
    console.log(obje);
    // yapılan test silinecek row
    findTestGroups(obje);
    console.log(foundTestGroupNames);

    if (foundTestGroupNames.includes(currentTestGroup)) {
      for (let i = 1; i < obje.length; i++) {
        if (obje[i][0].testGroupName === currentTestGroup) {
          if (obje[0].length === 3 && obje[i][1] != "N/A") {
            // EĞER TEK COLUMNA DÜŞTÜYSE
            setTest(obje[i][0]);
            testsToExport.push(obje[i][0].name);
            break;
          }
          // BURAYA VE KOYUP N/A DEĞİL DİYE KONTROL ETTİRİRSEK İLK EXCEL İÇİN ÇALIŞIR.
        }
      }
    } else {
      findTestGroups(obje);
      currentTestGroup = foundTestGroupNames[0];
      console.log(obje);
      for (let i = 1; i < obje.length; i++) {
        if (obje[i][0].testGroupName === currentTestGroup) {
          if (obje[0].length === 3 && obje[i][1] != "N/A") {
            // EĞER TEK COLUMNA DÜŞTÜYSE
            setTest(obje[i][0]);
            testsToExport.push(obje[i][0].name);
            break;
          }
        }
      }
    }
    let doesExit = false;
    if (foundTestGroupNames.includes(currentTestGroup)) {
      for (let i = 1; i < obje.length; i++) {
        for (let j = 1; j < obje.length; j++) {
          if (obje[i][0].testGroupName === currentTestGroup) {
            if (
              obje[0].length > 3 &&
              (obje[i][j] === "P" || obje[i][j] === "N")
            ) {
              setTest(obje[i][0]);
              testsToExport.push(obje[i][0].name);
              doesExit = true;
              break;
            }
          }
        }
        if (doesExit) {
          break;
        }
      }
    }
  }

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
    var tableData = [];

    var body = [["Tests Done", "Results"], testsToExport, testResults];
    const array = localStorage.getItem("matrixResult").split(",");
    const pageCount = doc.internal.pages.length;
    for (let i = 1; i < pageCount; i++) {
      doc.setPage(i);
      doc.setFont("Roboto-Bold");
      doc.setFontSize(12);
      doc.setTextColor("#000000");

      doc.setFontSize(10);
      doc.text(20, 25, "Document Prepared By:");
      doc.setFontSize(25);
      doc.text(60, 13, "Medical Diagnosis DSS");
      doc.setFontSize(10);
      doc.text(
        20,
        30,
        localStorage.getItem("userName") +
          " " +
          localStorage.getItem("userLastname")
      );
      doc.setTextColor("black");
      doc.text(90, 270, "DSS IS THE FUTURE");
      doc.text(80, 275, "By: Burak Konuk, Ali Haydar Aslan");
      if (testsToExport.length === testCounter) {
        for (var j = 0; j < testsToExport.length; j++) {
          if (j === 0) {
            tableData.push([["Tests Applied"], ["Results"]]);
          }
          tableData.push([testsToExport[j], testResults[j]]);
        }
      } else {
        testsToExport.pop();
        for (var k = 0; k < testsToExport.length; k++) {
          if (k === 0) {
            tableData.push([["Tests Applied"], ["Results"]]);
          }
          tableData.push([testsToExport[k], testResults[k]]);
        }
      }
      doc.autoTable({
        body: tableData,
        startY: 50,
        theme: "grid",
      });
    }
    doc.save();
  };

  useEffect(() => {
    setSelectedKey("x");
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
        obje = JSON.parse(result);
        for (let k = 1; k < obje[0].length - 1; k++) {
          currentPossible.push(obje[0][k]);
        }
        for (let i = 1; i < obje.length; i++) {
          const firstElement = obje[i][0];
          const testFinder = obje[i][0];

          const testGroupName = firstElement.testGroupName;
          if (
            !foundTestGroupNames.includes(testGroupName) &&
            testFinder != "N/A"
          ) {
            foundTestGroupNames.push(testGroupName);
          }
        }

        if (!localStorage.getItem("testCounter")) {
          localStorage.setItem("testCounter", 1);
        }
        if (!localStorage.getItem("matrixResult")) {
          localStorage.setItem("matrixResult", "");
        }
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
          }
        }
        setTest(firstTestX);
        testsToExport.push(firstTestX.name);
        currentTestGroup = firstTestX.testGroupName;

        console.log(obje);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const items = [
    {
      label: "P",
      key: "1",
    },
    {
      label: "N",
      key: "2",
    },
  ];

  const onClick = ({ key }) => {
    const tempObject = {};
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      if (element.key == key) {
        setSelectedKey(element.label);
        tempObject[currentsonuc] = element.label;
      }
    }
    const temp = StageResult;
    setStageResult(temp);

    localStorage.setItem("currentSonuc", tempObject[currentsonuc]);
  };
  const onSubmit = () => {
    console.log(selectedKey);
    if (selectedKey === "x") {
      showModal();
    } else {
      setSelectedKey("x");
      findNextTest(obje);
      currentPossible.length = 0;
      for (let k = 1; k < obje[0].length - 1; k++) {
        currentPossible.push(obje[0][k] + "\n");
      }
      if (localStorage.getItem("currentSonuc") === "P") {
        testResults.push("Pathologic");
      } else {
        testResults.push("Normal");
      }
    }
  };

  return (
    <>
      <div className="container-fluid p-5">
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-light text-center">
              Current Test Group: {currentTestGroup}
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
                  title={"What is the result of the test   '" + test.name + "'"}
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
                testCounter++;
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
        <div className="row mt-5 justify-content-center">
          <div className="col-12 w-25">
            <h3 className="text-blue text-center">Current Possible Diseases</h3>
          </div>
        </div>
        <div
          className="row mt-5 justify-content-center"
        >
          <div className="col-12 w-30 text-center">
            {currentPossible.map((item, index) => (
              <span
                key={index}
                className="text-center"
                style={{ color: "red", fontWeight: "bold" }}
              >
                {item}
                <br />
              </span>
            ))}
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
