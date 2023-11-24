import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// const jwt=require("jsonwebtoken")

const Login = (props) => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin =  () => {
    axios
    .post("http://localhost:5000/login", {...formData})
    .then((res) => {
      if(formData.email.trim()===""||formData.password.trim()==="")
      return alert("username or password cannot be empty")
      else{
        if(res.status===200){
          props.setLoginState(true);
          props.setSelected(res.data.userList)
          props.setTokenKey(res.data.token);
          localStorage.setItem("token",res.data.token)
          navigate('/home');}
          else{
            alert("invalid username or password");
          }
         
        }
        setFormData({
          email:"",password:""
      })
    }).catch((err)=>{
      console.log("err",err);
      if(err.response.data.message)
      alert(err.response.data.message)
    })
    }

  return (
    <div className="flex justify-center mt-10 items-center h-screen">
      <div className="bg-blue-400 rounded-xl mb-[10%] p-[100px]">
        <h1 className="text-2xl pb-10 text-center mb-4">Login Form</h1>
  
        <div className="in-grp pb-5">
          <label htmlFor="email">Email</label>
          <input
            className="border outline-none flex rounded-lg py-2 px-4 border-black"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="in-grp">
          <label htmlFor="password">Password</label>
          <input
            className="border outline-none flex rounded-lg py-2 px-4 border-black"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-600 border mt-10 ml-0 hover.bg-blue-700 w-[100%] text-white py-2 px-4 rounded"
          onClick={()=>handleLogin()}
        >
          Login
        </button>
        <div className='mt-2 text-blue-800 '>
        <Link to="/signup">Sign Up</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
