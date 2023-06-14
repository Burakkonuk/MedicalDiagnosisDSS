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
const cors = require("cors");

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
    const handWrittenData = [
      [
        null,
        "LESION OF THE LATERAL CUTANEOUS NERVE OF THE THIGH (MERALGIA PARESTHETICA)",
        "FEMORAL NERVE LESION",
        "L2-4 RADICULOPATHY",
        "Priorities",
      ],
      [
        { name: "n.fem. cut. Lateralis", testGroupName: "SNCS" },
        "P",
        "N",
        "N/A",
      ],
      [
        { name: "r.cutaneus femoris anterior", testGroupName: "SNCS" },
        "N/A",
        "P",
        "N/A",
      ],
      [{ name: "n. Saphenus", testGroupName: "SNCS" }, "N/A", "P", "N"],
      [{ name: "n. Suralis", testGroupName: "SNCS" }, "N/A", "N", "N/A"],

      [{ name: "n.femoralis", testGroupName: "MNCS" }, "N/A", "P", "N"],

      [{ name: "m. Add. Magnus", testGroupName: "EMG" }, "N", "N", "P"],
      [{ name: "m. Quadriceps", testGroupName: "EMG" }, "N", "P", "P"],
      [{ name: "m. Tibialis ant.", testGroupName: "EMG" }, "N/A", "N", "N"],
      [{ name: "paravertebral L2-4", testGroupName: "EMG" }, "N/A", "N", "P"],
    ];

    const resultArray = handWrittenData.slice(1).map((row) => {
      const NCount = row.filter((value) => value === "N").length;
      const PCount = row.filter((value) => value === "P").length;
      const NACount = row.filter((value) => value === "N/A").length;
      return ((NCount + 1) * (PCount + 1)) / (NACount + 1);
    });

    for (let i = 0; i < resultArray.length; i++) {
      handWrittenData[i + 1].push(resultArray[i]);
    }

    console.log(handWrittenData);

    return res.status(201).send(handWrittenData);
  } catch (err) {
    console.log(err);
  }
};
const tooarr2 = async (req, res) => {
  try {
    const handWrittenData = [
      [
        null,
        "ULNAR NERVE LESION AT THE WRIST",
        "ULNAR NERVE LESION AT THE MEDIAL EPICONDYLE",
        "ULNAR NERVE LESION IN THE CUBITAL TUNNEL",
        "C8 RADICULOPATHY",
        "INFERIOR TRUNK",
        "MEDIAL CORD",
        "SUPERFICIAL SENSORY BRANCH OF THE ULNAR NERVE LESION",
        "Priorities",
      ],
      [
        { name: "SNCS: n.medianus", testGroupName: "SNCS" },
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
      ],
      [
        { name: "SNCS: n. ulnaris(latency)", testGroupName: "SNCS" },
        "P",
        "N",
        "N",
        "N",
        "N",
        "N",
        "P",
      ],
      [
        {
          name: "SNCS: n. ulnaris(conduction velocity)",
          testGroupName: "SNCS",
        },
        "P",
        "N",
        "N",
        "N",
        "N",
        "N",
        "P",
      ],
      [
        { name: "SNCS: n. ulnaris(SNAP)", testGroupName: "SNCS" },
        "P",
        "P",
        "P",
        "N",
        "P",
        "P",
        "P",
      ],
      [
        { name: "SNCS: n.radialis", testGroupName: "SNCS" },
        "N",
        "N",
        "N",
        "N/A",
        "N",
        "N",
        "N",
      ],
      [
        { name: "SNCS: n.ulnaris dorsal cut. branch", testGroupName: "SNCS" },
        "N",
        "P",
        "P",
        "N",
        "P",
        "P",
        "N",
      ],
      [
        { name: "n.cut.antebrachi medialis", testGroupName: "MNCS" },
        "N/A",
        "N",
        "N",
        "N",
        "P",
        "N",
        "N",
      ],
      [
        { name: "MNCS: n.ulnaris(distal latency)", testGroupName: "MNCS" },
        "P",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
      ],
      [
        { name: "MNCS: n.ulnaris(CMAP)", testGroupName: "MNCS" },
        "P",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "N",
      ],
      [
        { name: "MNCS: n.ulnaris(CV at the forearm)", testGroupName: "MNCS" },
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
      ],
      [
        { name: "MNCS: n.ulnaris(CV at the elbow)", testGroupName: "MNCS" },
        "N",
        "P",
        "P",
        "N",
        "N",
        "N",
        "N",
      ],
      [
        {
          name: "inching:n.ulnaris(CV at just distal to medial epicondyl)",
          testGroupName: "MNCS",
        },
        "N/A",
        "N",
        "P",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
      ],
      [
        {
          name: "inching:n.ulnaris(CV at or just proximal to medial epicondyl)",
          testGroupName: "MNCS",
        },
        "N/A",
        "P",
        "N",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
      ],
      [
        { name: "MNCS: n.medianus", testGroupName: "MNCS" },
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
        "N",
      ],
      [
        { name: "m.interossei dorsalis 1", testGroupName: "EMG" },
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "N",
      ],
      [
        { name: "m. Abductor digiti minimi", testGroupName: "EMG" },
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "N",
      ],
      [
        { name: "m. Ext. İndicis proprius", testGroupName: "EMG" },
        "N",
        "N",
        "N",
        "P",
        "P",
        "N",
        "N",
      ],
      [
        { name: "m.flx.carpi ulnaris", testGroupName: "EMG" },
        "N",
        "P",
        "P",
        "P",
        "P",
        "P",
        "N",
      ],
      [
        { name: "EMG:m.abd.pol.brevis", testGroupName: "EMG" },
        "N",
        "N",
        "N",
        "P",
        "P",
        "P",
        "N",
      ],
      [
        { name: "EMG:paravertebral C8", testGroupName: "EMG" },
        "N",
        "N",
        "N",
        "P",
        "N",
        "N",
        "N",
      ],
    ];

    const resultArray = handWrittenData.slice(1).map((row) => {
      const NCount = row.filter((value) => value === "N").length;
      const PCount = row.filter((value) => value === "P").length;
      const NACount = row.filter((value) => value === "N/A").length;
      return ((NCount + 1) * (PCount + 1)) / (NACount + 1);
    });

    for (let i = 0; i < resultArray.length; i++) {
      handWrittenData[i + 1].push(resultArray[i]);
    }

    return res.status(201).send(handWrittenData);
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
  tooarr2,
};
