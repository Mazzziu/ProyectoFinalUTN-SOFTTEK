import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Page from "./components/Page";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Page></Page>}></Route>
            </Routes>

            <Outlet />
        </>
    );
}

export default App;
