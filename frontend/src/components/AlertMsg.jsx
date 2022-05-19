import React from "react";
import Alert from "@mui/material/Alert";

const AlertMsg = ({ show, msg, type }) => {
    const [open, setOpen] = React.useState(show);

    React.useEffect(() => {
        setOpen(show);
        if (show) {
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    }, [show]);

    return open && <Alert severity={type}>{msg}</Alert>;
};

export default AlertMsg;
