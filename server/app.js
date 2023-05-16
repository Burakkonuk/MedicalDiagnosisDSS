require("express-async-errors");
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const User = require("./src/models/user.model");
const bodyParser = require('body-parser');
const cors = require('cors');
const APIError = require('./src/utils/errors')
const { createToken } = require("./src/middlewares/auth")
const bcrypt = require("bcrypt");

// Middleware
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use("/", router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

app.post("/api/register", (req,res) => {

  try {
    const {name, lastname,email,password} = req.body
    const user = new User({name, lastname,email,password});
    user.save();
    res.send(user);
    console.log(res)

  } catch (error){
    res.status(500).send(error);
  }
})


app.post("/api/login", async (req,res)=> {
  try {
    const tempUser = await User.findOne({email:req.body.email})
    if (!tempUser){
      console.log("tempuser")
      throw new APIError("Email or password is incorrect!", 401);
    } 

  const validatedUser = await bcrypt.compare(
    req.body.password,
    tempUser.password
  );

  if (!validatedUser){
    console.log("tempuser1")
    throw new APIError("Email or password is incorrect!", 401);
  }
  

  createToken(tempUser, res);
  } catch (error){
    res.status(500).send(error);
    console.log(error)
  }
  
  
})

//Exception handling
app.use(errorHandlerMiddleware);

app.listen(5000, () => {
  
});
