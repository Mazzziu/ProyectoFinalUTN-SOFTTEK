import React from "react";
import Alert from "@mui/material/Alert";

const AlertMsg = ({ show, msg, type }) => {
    return show && <Alert severity={type}>{msg}</Alert>;
};

export default AlertMsg;
