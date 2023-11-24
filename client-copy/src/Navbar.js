import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
// import { Modal, Button } from "antd";

const Navbar = (props) => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar className="flex justify-between text-white">
            <Box className="flex items-center mr-24 text-white">
              <span className="text-white pr-5 ">{props.firstName}</span>
              <span className="text-white pl-5  "> {props.role} </span>
            </Box>
            <Box>
              <NavLink
                className="text-white hover:opacity-70  active:bg-blue-700 p-5 rounded-sm"
                to="/"
                onClick={localStorage.removeItem('token')}
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

export default Navbar;
