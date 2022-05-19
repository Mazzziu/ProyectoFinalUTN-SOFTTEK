import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const DialogWindow = ({ show, setShow, title, content, onSuccess }) => {
    const handleSuccess = () => {
        onSuccess();
        setShow(false);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Dialog
            open={show}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button onClick={handleSuccess}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogWindow;
