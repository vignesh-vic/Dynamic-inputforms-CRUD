import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
// import { Modal, Button } from "antd";

const Home = () => {
  const navigate = useNavigate(); // Get the history object from react-router-dom

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
    <AppBar position="static">
      <Container>
        <Toolbar className="flex justify-between text-white">
          <Box className="flex items-center mr-14 text-white">
          <NavLink
                className="text-white hover:opacity-70  active:bg-blue-700 p-5 rounded-sm"
                to="/user"
              >
                CreateUsers
              </NavLink>|
          <NavLink
                className="text-white hover:opacity-70  active:bg-blue-700 p-5 rounded-sm"
                to="/formcrud"
              >
                CreateForms
              </NavLink>
          </Box>
          <Box>
              <NavLink
                className="text-white hover:opacity-70  active:bg-blue-700 p-5 rounded-sm"
                to="/"
                onClick={handleLogout} // Call the handleLogout function on click

              >
                Logout
              </NavLink>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
     </>
  );
};

export default Home;
