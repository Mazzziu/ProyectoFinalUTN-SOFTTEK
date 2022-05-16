import { useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

import useLogin from "./components/Page/hooks/useLogin";

//page
import Page from "./components/Page";
import LoginPage from "./components/Page/LoginPage";
import SignUp from "./components/Page/SignUp";
import SignIn from "./components/Page/SignIn";

//dashboard
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Dashboard/Inicio";
import MiCarta from "./components/Dashboard/MiCarta";
import MiPerfil from "./components/Dashboard/MiPerfil";
import Ordenes from "./components/Dashboard/Ordenes";
import NewMenu from "./components/Dashboard/MiCarta/NewMenu";

function App() {
    const { isLogin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin()) {
            navigate("./dashboard/carta");
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
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='carta' element={<Outlet />}>
                        <Route index element={<MiCarta />} />
                        <Route path='new-menu' element={<NewMenu />} />
                    </Route>
                    <Route path='perfil' element={<MiPerfil />} />
                    <Route path='ordenes' element={<Ordenes />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
