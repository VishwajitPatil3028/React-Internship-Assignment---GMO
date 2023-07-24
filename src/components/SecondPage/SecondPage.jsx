import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import SecondPageFirstComponent from "./DataGridComponent";
import DepartmentListComponent from "./CheckBoxComponent";
import "./SecondPage.css";

const SecondPage = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    // Check if user details are available in local storage
    if (!userDetails) {
      alert(
        "Please enter your details on the first page before accessing this page."
      );
      navigate("/first-page");
    }
  }, [navigate, userDetails]);

  return (
    <div className="SecondPage model-wrapper2 ">
      <div className="greet">
        <h1>Welcome to the Second Page!</h1>
        {userDetails && (
          <>
            <p>Name: {userDetails.firstName + " " + userDetails.lastName}</p>
            <p>Phone Number: {userDetails.contact}</p>
            <p>Email: {userDetails.email}</p>
          </>
        )}
      </div>
      <SecondPageFirstComponent />
      <div className="greet">
        <DepartmentListComponent />
      </div>
    </div>
  );
};

export default SecondPage;
