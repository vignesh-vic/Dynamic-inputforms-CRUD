import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import Navbar from "./Navbar"; // Import the Navbar component
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const FormCrud=() =>{
  //
  const [inputData,setInputData]=useState([])


  const token=localStorage.getItem("token")

  const [columDefination] = useState([
    { field: "Name" },
    { field: "createdAt" },
    { field: "createdBy", },
    { field: "ListOf Submission" }

  ]);

  //   console.log("up",passingId);

  //   if (
  //     !inputValues.firstName
  //     // !inputValues.lastName ||
  //     // !inputValues.email ||
  //     // !inputValues.gender ||
  //     // isNaN(inputValues.age)
  //   ) {
  //     alert("Please enter valid data for all fields.");
  //     return;
  //   }

  //   // Create an object with the fields you want to update
  //   const updatedFields = {
  //     firstName: inputValues?.firstName,
  //     lastName: inputValues?.lastName,
  //     gender: inputValues?.gender,
  //     email: inputValues?.email,
  //     // password: inputValues?.password,
  //     // confirmPassword: inputValues?.confirmPassword,
  //     role: inputValues?.role,
  //     age: Number(inputValues.age),
  //   };

  //   // Send a PATCH request to update specific fields
  //   axios
  //     .patch(`http://localhost:5000/my/${_id}`, updatedFields,{
  //       headers: {
  //         Authorization: `Bearer ${props.token}`
  //       }
  //     })
  //     .then((res) => {
  //       if (res.data.message) {
  //         alert(res.data.message);
  //       }
  //     }
  //     );

      

  //   // Update the user details in the frontend state
  //   // setUserDetails((prev) => {
  //   //   return prev.map((user) => {
  //   //     if (user._id === _id) {
  //   //       return {
  //   //         ...updatedFields,
  //   //       };
  //   //     }
  //   //     return user;
  //   //   });
  //   // });
    
  //   // Reset input fields and exit editing mode
  //   setInputValues({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     gender: "",
  //     age: "",
  //     password: "",
  //     confirmPassword: "",
  //     role:""
  //   });
  // };


  

  // const handleSave = () => {
  //   if (
  //     !inputValues.firstName ||
  //     !inputValues.lastName ||
  //     !inputValues.email ||
  //     !inputValues.gender ||
  //     isNaN(inputValues.age) || // Check if age is a valid number
  //     inputValues.Active === null // Check if Active is a valid boolean
  //   ) {
  //     alert("Please enter valid data for all fields.");
  //     return;
  //   }

  //   axios
  //     .post("http://localhost:5000/post", {
  //       firstName: inputValues.firstName,
  //       lastName: inputValues.lastName,
  //       gender: inputValues.gender,
  //       email: inputValues.email,
  //       password: inputValues.password,
  //       confirmPassword: inputValues.confirmPassword,
  //       role: inputValues.role,
  //       age: inputValues.age,
  //     })
  //     .then((res) => {
        
  //       setUserDetails((prev) => {
  //         const newId = generateUniqueID();
  //         const arr = [...prev];
  //         arr.push({
  //           Id: newId,
  //           firstName: inputValues.firstName,
  //           lastName: inputValues.lastName,
  //           gender: inputValues.gender,
  //           email: inputValues.email,
  //           password: inputValues.password,
  //           confirmPassword: inputValues.confirmPassword,
  //           role: inputValues.role,
  //           age: Number(inputValues).age,
  //           // Active: inputValues.Active,
  //         });
  //         return arr;
  //       });
  //       setInputValues({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         gender: "",
  //         age: "",
  //         password: "",
  //         confirmPassword: "",
  //         role:""
  //       });
  //       if (res.data.message) {
  //         alert(res.data.message);
  //       }
  //     });
  // };

  //defauldcoldefs
  const defaultCol = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };
  const gridOptions = {
    // Add this configuration for showing "No rows" message
    domLayout: 'autoHeight',
    noRowsOverlay: true,
  };

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Home") {
      navigate("/home");
    }
  };

  return (
    <div>
      <Navbar    
        />
  <div
        className="mt-11 ml-2 bg-slate-200  p-1 pl-2  h-9 rounded-sm"
        role="presentation"
        onClick={handleClick}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="font-bold"
            underline="hover"
            color="inherit"
          >
            Home
          </Link>
          <Typography className="font-bold" color="text.primary">
          FormCrud
          </Typography>
        </Breadcrumbs>
      </div>
      
    <Link to="/form">
        <button
          className="ml-4 mt-9"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
            marginRight: "180px",
          }}
        >
          Create NewForm
        </button>
      </Link>
      <div className="w-[100%] mt-6 p-4 ">
        <div className=" ag-theme-alpine " style={{ height: 900 }}>
          <AgGridReact
            
            gridOptions={gridOptions}
            rowData={inputData}
            columnDefs={columDefination}
            defaultColDef={defaultCol} // Set onGridReady prop
          />
        </div>
      </div>
    </div>
  );
}
export default FormCrud;
