import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import useLogin from "./components/Page/hooks/useLogin";

//page
import Page from "./components/Page";
import LoginPage from "./components/Page/LoginPage";
import SignUp from "./components/Page/SignUp";
import SignIn from "./components/Page/SignIn";

//dashboard
import Dashboard from "./components/Dashboard";

function App() {
    const { isLogin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin()) {
            navigate("./dashboard");
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Page />}>
                    <Route index element={<LoginPage />} />
                    <Route path='signin' element={<SignIn />} />
                    <Route path='signup' element={<SignUp />} />
                </Route>
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
