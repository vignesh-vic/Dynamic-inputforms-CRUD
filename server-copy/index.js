const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const schema = mongoose.Schema;
mongoose
  .connect(
    "mongodb+srv://vignesh:vignesh123@cluster0.9cqtctj.mongodb.net/sample"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//100-message
//200-sucess
//300-redirect
//400-client side error
//500-sever side error

const userSchema = new schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: { type: String },
  email: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
  role: { type: String },
  age: { type: Number },
});


const userModel = mongoose.model("user", userSchema);
const cors = require("cors");
app.use(cors());

const verifyTokenKey = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
      req.user = decoded;
      // res.header("Authorization", `Bearer ${token}`);
      next();
    } catch (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
  } else {
    return res
      .status(401)
      .send({ message: `Authentication error. Token required.` });
  }
};

//GET
app.get("/get", verifyTokenKey, async (_, res) => {
  try {
    const data = await userModel.find();
    res.status(200).send({ message: "Get method run sucessfully", data: data });
  } catch (error) {
    res.status(500).send({ message: "server side error" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      gender,
      password,
      confirmPassword,
      role,
      age,
    } = req.body || {};
    // Validate that the received data has the required properties

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    if (!firstName || !lastName || !email || !gender || !age)
      return res.status(400).json({ message: "Required field missing" });
    const userData = new userModel({
      firstName,
      lastName,
      email,
      gender,
      password: hashedpassword,
      confirmPassword,
      role,
      age,
    });

    await userData.save();
    return res.status(200).send({ message: "Data inserted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "server side error" });
  }
});

// PUT
app.put("/put", verifyTokenKey, async (req, res) => {
  try {
    const { updatedNames = [] } = req.body;
    if (!Array.isArray(updatedNames) || updatedNames.length === 0) {
      return res.status(400).send({ message: "An array of names is required" });
    }
    // Replace the contents of storedb with the new array
    storedb = [...updatedNames];
    return res.status(200).send({ message: "Array updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Server-side error" });
  }
});

app.patch("/my/:Id", verifyTokenKey, async (req, res) => {
  try {
    const { Id = "" } = req.params || {};

    if (!Id || !mongoose.isValidObjectId(Id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      confirmPassword,
      role,
      age,
    } = req.body || {};
    if (!firstName || !lastName || !email || !gender || !age)
      return res.status(400).json({ message: "Required field missing" });

    const userData = await userModel.findById(Id);
    if (!userData) return res.status(400).json({ message: "invaild id" });

    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.gender = gender;
    userData.email = email;
    userData.password = password;
    userData.confirmPassword = confirmPassword;
    userData.role = role;
    userData.age = age;

    await userData.save();

    return res.status(200).send({ message: "data updated successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: "Server-side error" });
  }
});

app.delete("/delete/:Id", verifyTokenKey, async (req, res) => {
  try {
    const { Id = "" } = req.params || {};
    if (!Id) return res.status(400).json({ message: "Required field missing" });

    await userModel.findByIdAndDelete(Id);
    return res.status(200).send({ message: "Row Deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Server-side error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.trim() == "" || password.trim() == "")
      return res
        .status(400)
        .send({ message: "user name  password cannot be empty" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ message: "user name or password is invalid" });
    const index = bcrypt.compare(password, user.password);

    if (!index)
      return res.status(400).send({ message: "Invalid username or password" });

    const token = jwt.sign(
      {
        userList: user,
      },
      `${process.env.JWT_SECRET}`
      // { expiresIn: "1h" }
    );

    // res.header("Authorization", `Bearer ${token}`);
    return res.status(200).send({
      message: "Login successful",
      userList: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "error at login" });
  }
});

//formSchema
const formSchema = new schema({
  formName: { type: String },
  formData: { type: Array },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  Submissons: { type: Array },
});
const formModel = mongoose.model("form", formSchema);

//GET
// GET 
app.get("/getDetails", async(_, res) => {
  const data = await formModel.find();
  // Send a response
  res.json({ message: "GET request received successfully in", data: data  });
});

//formdata
app.post("/updateNames", async (req, res) => {
  try {
    const { name, form , createdBY } = req.body;
    const formName=name;
    const formData=form;
    const createdBy=createdBY;
    // Create a new document using the Mongoose model
    const newForm = new formModel({ formName, formData, createdBy  });
    // Save the document to the MongoDB database

    await newForm.save();
    return res
      .status(200)
      .send({
        message: "Form data updated and stored in MongoDB successfully",
      });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send({ message: "Server-side error" });
  }
});


app.listen(5000, () => {
  console.log("50000 server running");
});
