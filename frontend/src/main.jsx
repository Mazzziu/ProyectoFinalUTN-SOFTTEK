import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                TransitionComponent={Slide}
            >
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </React.StrictMode>
);
