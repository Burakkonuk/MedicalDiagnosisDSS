const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const crypto = require("crypto");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const nodemailer = require("nodemailer");
const TestGroup = require("../models/testGroup.model");
const Test = require("../models/test.model");
const Prediagnoses = require("../models/prediagnoses.model");
const Strategy = require("../models/strategy.model");
const XLSX = require("xlsx");
const excelFilePath = "emgalgorithm.xlsx";
const cors = require('cors')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const login = async (req, res) => {
  let userInfo;

  userInfo = await User.findOne({ email: req.body.email });
  if (!userInfo) throw new APIError("Email or password is incorrect!", 401);

  const validatedUser = await bcrypt.compare(
    req.body.password,
    userInfo.password
  );

  if (!validatedUser)
    throw new APIError("Email or password is incorrect!", 401);

    return new Response(userInfo).success(res);

  //createToken(userInfo, res);
};

const register = async (req, res) => {
  try {
    let { name, lastname, email, password } = req.body;

    name = name.trim();
    lastname = lastname.trim();
    email = email.trim();
    password = password.trim();

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      throw new APIError("Mail is already on use!", 401);
    }

    const user = new User({
      name,
      lastname,
      email,
      password,
      emailToken: crypto.randomBytes(64).toString("hex"),
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    await user.save();

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "Verify your email",
      html: `<h2> ${user.name} ${user.lastname}, thanks for registering on our site! </h2>
             <h4> Please verify your email address to continue.. </h4>
             <a href="http://${req.headers.host}/verify-email?token=${user.emailToken}"> Verify your email address </a>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        throw new APIError("Verification email sent to your account", 400);
      }
    });

    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: user._id,
        email: user.email,
      },
    });

    // bcrypt.hash(password, 10).then(async (hashedPassword) => {
    //   const user = new User({
    //     name,
    //     lastname,
    //     email,
    //     password: hashedPassword,
    //     emailToken: crypto.randomBytes(64).toString("hex"),
    //   });

    //   userSave
    //     .save()
    //     .then((result) => {
    //       sendOTPVerificationEmail(result, res);
    //     })
    //     .catch((err) => {
    //       throw new APIError(err, 400);
    //     });
    // });
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const me = async (req, res) => {
  return new Response(req.user).success(res);
};

const verifyemail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });

    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
    } else {
      throw new Error("Email is not verified", 400);
    }
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const addTestGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const newTestGroup = new TestGroup({
      name,
    });

    await newTestGroup.save();
    return res.status(201).send(newTestGroup);
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const addTest = async (req, res) => {
  try {
    const { name, priority, testGroupId } = req.body;

    const newTest = new Test({
      name,
      priority,
      testGroupId,
    });

    await newTest.save();
    return res.status(201).send(newTest);
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const addPrediagnoses = async (req, res) => {
  try {
    const { name } = req.body;
    const newPrediagnoses = new Prediagnoses({
      name,
    });

    await newPrediagnoses.save();
    return res.status(201).send(newPrediagnoses);
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const addStrategy = async (req, res) => {
  try {
    const { explanation, prediagnosesId } = req.body;
    const newStrategy = new Strategy({
      explanation,
      prediagnosesId,
    });

    await newStrategy.save();
    return res.status(201).send(newStrategy);
  } catch (error) {
    throw new APIError(error, 400);
  }
};

const tooarr = async (req, res) => {
  try {
    const test1 = await Test.find();
    const prediagnoses1 = await Prediagnoses.find();
    const testGroups = {};

    for (const test of test1) {
      const { testGroupId, priority } = test;

      if (!testGroups[testGroupId]) {
        testGroups[testGroupId] = { totalPriority: 0, testCount: 0 };
      }

      testGroups[testGroupId].totalPriority += priority;
      testGroups[testGroupId].testCount++;
    }
    const testGroupMeans = {};

    for (const testGroupId in testGroups) {
      const { totalPriority, testCount } = testGroups[testGroupId];
      const meanPriority = totalPriority / testCount;
      testGroupMeans[testGroupId] = meanPriority;
    }

    test1.sort((a, b) => b.priority - a.priority);

    const testGroups1 = {};

    for (const test of test1) {
      const { testGroupId } = test;

      if (!testGroups1[testGroupId]) {
        testGroups1[testGroupId] = [];
      }

      testGroups1[testGroupId].push(test);
    }

    const result = [];

    for (const testGroupId in testGroups1) {
      if (testGroups1.hasOwnProperty(testGroupId)) {
        result.push(testGroups1[testGroupId]);
      }
    }
    result.sort((a, b) => {
      const testGroupIdA = a[0].testGroupId;
      const testGroupIdB = b[0].testGroupId;
      const valueA = testGroupMeans[testGroupIdA];
      const valueB = testGroupMeans[testGroupIdB];

      return valueB - valueA;
    });
    const matrix = [];

    const firstRow = [""];
    for (const x of result) {
      for (const y of x) {
        firstRow.push(y.name);
      }
    }
    matrix.push(firstRow);

    for (const prediagnosis of prediagnoses1) {
      const row = [prediagnosis.name];

      for (let i = 0; i < test1.length; i++) {
        row.push("");
      }

      matrix.push(row);
    }

    console.log(matrix);

    function readExcelData(filePath) {
      const workbook = XLSX.readFile(filePath);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      const numRows = range.e.r + 1;
      const numCols = range.e.c + 1;
      const data = [];

      for (let i = 5; i < numRows; i++) {
        const rowData = [];
        for (let j = 1; j < numCols; j++) {
          const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });
          const cellValue = worksheet[cellAddress]?.v;
          rowData.push(cellValue);
        }
        data.push(rowData);
      }

      return data;
    }

    // Excel verilerini oku ve 2 boyutlu diziye aktar
    const excelData = readExcelData(excelFilePath);

    // 2 boyutlu dizideki verileri kontrol et

    for (let i = 0; i < excelData.length; i++) {
      for (let j = 0; j < excelData[i].length; j++) {
        if (excelData[i][j] === undefined) {
          excelData[i][j] = "N/A";
        }
      }
    }
    console.log(excelData);

    // Elemana erişim örneği
    console.log(excelData[0][0]); // İlk satırın ilk sütunu
    return res.status(201).send(matrix[0][2]);
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    
    console.log(req.user);

    const user = await User.find(req.user._id);
    console.log(user);
    return new Response(user).success(res);

  } catch (error) {
    console.log(error);
  }
  
};

module.exports = {
  login,
  register,
  me,
  verifyemail,
  addTestGroup,
  addTest,
  addPrediagnoses,
  addStrategy,
  tooarr,
  getUserById,
};