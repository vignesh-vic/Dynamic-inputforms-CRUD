import React, { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import Navbar from "./Navbar"; // Import the Navbar component
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

// import Item from "antd/es/list/Item";
export default function UserCrud(props) {
  const [changeButtonMode, setchangeButtonMode] = useState(1);
  //store id in the state to find id to replace to update values
  const [passingId, setPassingId] = useState(0);
  const role = !(
    props.selected.role === "Owner" || props.selected.role === "SuperAdmin"
  );

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

  const [userDetails, setUserDetails] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState(null);

  //find the max id in the table
  const generateUniqueID = () => {
    const maxID = userDetails.reduce(
      (max, user) => (user.Id > max ? user.Id : max),
      0
    );
    return maxID + 1;
  };

  const [columDefination] = useState([
    { field: "firstName" },
    { field: "lastName" },
    { field: "gender" },
    { field: "email" },
    { field: "role", headerName: "Role" },
    { field: "age" },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            onClick={() => {
              showDatas(data);
              console.log("click edit",data._id);
              setPassingId(data._id);
            }}
            style={{
              backgroundColor: "blue",
              border: "none",
              color: "white",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            Edit{" "}
          </button>
        );
      },
      hide: role,
    },
    {
      field: "Action",
      cellRenderer: ({ data }) => {
        return (
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "4px 10px ",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={() => {
              onHandleDelete(data._id); // Pass _id to onHandleDelete
            }}
          >
            Delete
          </button>
        );
      },
      hide: role,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //edit button show datas
  const showDatas = (resiveObj) => {
    setchangeButtonMode(1);
    setInputValues({
      firstName: resiveObj?.firstName,
      lastName: resiveObj?.lastName,
      gender: resiveObj.gender,
      email: resiveObj?.email,
      password: resiveObj?.password,
      confirmPassword: resiveObj?.confirmPassword,
      role: resiveObj?.role,
      age: resiveObj?.age,
    });

    setPassingId(resiveObj?.Id);

    console.log("show", passingId);
  };

  const newUserList = userDetails?.filter(
    (items) => items._id !== props.selected._id
  );

  const onHandleEdit = (_id) => {
    console.log("up", passingId);

    if (
      !inputValues.firstName
      // !inputValues.lastName ||
      // !inputValues.email ||
      // !inputValues.gender ||
      // isNaN(inputValues.age)
    ) {
      alert("Please enter valid data for all fields.");
      return;
    }

    // Create an object with the fields you want to update
    const updatedFields = {
      firstName: inputValues?.firstName,
      lastName: inputValues?.lastName,
      gender: inputValues?.gender,
      email: inputValues?.email,
      // password: inputValues?.password,
      // confirmPassword: inputValues?.confirmPassword,
      role: inputValues?.role,
      age: Number(inputValues.age),
    };

    // Send a PATCH request to update specific fields
    axios
      .patch(`http://localhost:5000/my/${_id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
      });

    // Update the user details in the frontend state
    setUserDetails((prev) => {
      return prev.map((user) => {
        if (user._id === _id) {
          return {
            ...updatedFields,_id
          };
        }
        return user;
      });
    });

    // Reset input fields and exit editing mode
    setInputValues({
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      age: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

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
        confirmPassword: inputValues.confirmPassword,
        role: inputValues.role,
        age: inputValues.age,
      })
      .then((res) => {
        setUserDetails((prev) => {
          const newId = generateUniqueID();
          const arr = [...prev];
          arr.push({
            Id: newId,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            gender: inputValues.gender,
            email: inputValues.email,
            password: inputValues.password,
            confirmPassword: inputValues.confirmPassword,
            role: inputValues.role,
            age: Number(inputValues).age,
            // Active: inputValues.Active,
          });
          return arr;
        });
        setInputValues({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          age: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
        if (res.data.message) {
          alert(res.data.message);
        }
      });
  };

  //defauldcoldefs
  const defaultCol = {
    sortable: true,
    editable: true,
    filter: true,
    resizable: true,
    flex: 1,
  };

  const onHandleDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
        // Remove the deleted item from the local state
        setUserDetails((prev) => {
          return prev.filter((user) => user._id !== _id);
        });
      })
      .catch((err) => console.log(err));
    setInputValues({
      firstName: "",
      lastName: "",
      email: "",
      Password: "",
      confirmPassword: "",
      gender: "",
      age: "",
      role: "",
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/get", {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        const { data = [] } = res?.data || {};
        if (data && data?.length) {
          setUserDetails(data);
        }
      })
      .catch((err) => console.log(err));
  }, [props.token]);
//breadcrums

  
  return (
    <div>

      <Navbar
        role={props.selected.role}
        firstName={props.selected.firstName}
        setModalInputValues={setInputValues}
        showDatas={showDatas}
        seletion={props.selected}
        setPassingId={setPassingId}
      />
    <div
        className="mt-11 ml-2 mr-2 bg-slate-200  p-1 pl-2  h-9 rounded-sm"
        role="presentation"
        // onClick={handleClick}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="font-bold"
            underline="hover"
            color="inherit"
            href="/Home"
          >
            Home
          </Link>
          <Typography className="font-bold" color="text.primary">
            UserCrud
          </Typography>
        </Breadcrumbs>
      </div>
      <div
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
                  onHandleEdit(passingId);
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
          {changeButtonMode === 0 ? "ADD" : "UPDATE"}
        </button>
      </div>

      <div className=" w-[90%] p-4 ">
        <div className=" ag-theme-alpine" style={{ height: 900 }}>
          <AgGridReact
            rowData={newUserList}
            columnDefs={columDefination}
            defaultColDef={defaultCol} // Set onGridReady prop
          />
        </div>
      </div>
    </div>
  );
}
