import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {

  const navigate = useNavigate();

  const [changeButtonMode, setchangeButtonMode] = useState(0);
  const [inputValues, setInputValues] = useState({
    Id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    role: "",
    age: "",
    Active: "",
  });

  
  const handleSave = () => {
    if (
      !inputValues.firstName ||
      !inputValues.lastName ||
      !inputValues.email ||
      !inputValues.gender ||
      isNaN(inputValues.age) || // Check if age is a valid number
      inputValues.Active === null // Check if Active is a valid boolean
    ) {
      alert("Please enter valid data for all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/post", {
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        gender: inputValues.gender,
        email: inputValues.email,
        password: inputValues.password,
        role: inputValues.role,
        age: inputValues.age,
      },{
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>

    <div className="flex mt-10 justify-center items-center h-screen">
    <div className="bg-blue-400 mt-8 rounded-xl mb-[10%] p-[70px]">
<div className="text-center text-2xl mb-3">Create User</div>
      <div
        className=" "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          margin: "0 auto",
        }}
      >
        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          name="firstName"
          value={inputValues.firstName}
          onChange={handleChange}
          placeholder="firstName"
        />
        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          value={inputValues.lastName}
          name="lastName"
          onChange={handleChange}
          placeholder="lastName"
        />
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={inputValues.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={inputValues.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          value={inputValues.email}
          onChange={handleChange}
          name="email"
          placeholder="email"
        />
        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          type="password"
          value={inputValues.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          type="password"
          value={inputValues.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <select
          onChange={handleChange}
          name="role" // Set the name to "role"
          value={inputValues.role}
        >
          <option value="">Select</option>
          <option value="Manager">Manager</option>
          <option value="SuperAdmin">SuperAdmin</option>
          <option value="Admin">Admin</option>
          <option value="Owner">Owner</option>
        </select>
        <input
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            border: "1px solid #ccc",
          }}
          type="number"
          value={inputValues.age}
          onChange={handleChange}
          placeholder="age"
          name="age"
        />

        <button
          disabled={
            !inputValues.firstName ||
            !inputValues.lastName ||
            !inputValues.email ||
            !inputValues.gender ||
            isNaN(inputValues.age)
          }
          style={{
            margin: "5px",
            padding: "5px",
            width: "100%",
            borderRadius: "3px",
            cursor: "pointer",
            backgroundColor:
              !inputValues.firstName ||
              !inputValues.lastName ||
              !inputValues.email ||
              !inputValues.gender ||
              isNaN(inputValues.age)
                ? "#ccc" // Light gray when disabled
                : "blue", // Blue when enabled
            color: "white",
          }}
          onClick={
            changeButtonMode === 0
              ? () => {
                  handleSave();
                }
              : () => {
                  setchangeButtonMode(0);
                  setInputValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    gender: "",
                    age: "",
                    role: "",
                    password: "",
                    confirmPassword: "",
                  });
                }
          }
        >
          {changeButtonMode === 0 ? "Signup" : "UPDATE"}
        </button>
       <div className="bg-blue-700 w-[100%] text-center text-white p-2 rounded-lg mt-4">
       <Link className="pt-5" to="/">
          Login
        </Link>
       </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
