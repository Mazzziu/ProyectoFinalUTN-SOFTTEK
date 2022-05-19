import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

//page
import Page from "./components/Page";
import LoginPage from "./components/Page/LoginPage";
import SignUp from "./components/Page/SignUp";
import SignIn from "./components/Page/SignIn";
import MenuOnline from "./components/MenuOnline";

//dashboard
import Dashboard from "./components/Dashboard";
import Inicio from "./components/Dashboard/Inicio";
import MiCarta from "./components/Dashboard/MiCarta";
import MiPerfil from "./components/Dashboard/MiPerfil";
import Ordenes from "./components/Dashboard/Ordenes";
import NewMenu from "./components/Dashboard/MiCarta/NewMenu";

//context
import { MenuProvider } from "./components/context/MenuContext";

function App() {
    return (
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
            <Route
                path='/view/:menuId'
                element={
                    <MenuProvider>
                        <MenuOnline />
                    </MenuProvider>
                }
            />
        </Routes>
    );
}

export default App;
