import axios from "axios";
import { useState, useEffect } from "react";

const useLogin = () => {
    const SERVER = import.meta.env.VITE_APP_SERVER;

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [formError, setFromError] = useState({ status: false, msg: "" });
    const [formLoading, setFromLoading] = useState(false);
    const [formSuccess, setFromSuccess] = useState(false);

    useEffect(() => {
        let islogin = JSON.parse(localStorage.getItem("LOGIN"));
        if (islogin) {
            console.log("usuario logueado");
        } else {
            localStorage.setItem("LOGIN", "false");
            console.log("usuario no identificado");
        }
    }, []);

    const emailValid = (email) => {
        let regex = /^([da-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
        if (!regex.test(email)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
            return true;
        }
    };

    const passwordValid = (pass1, pass2) => {
        if (pass1 !== pass2) {
            setPasswordError(true);
            return false;
        }
        setPasswordError(false);
        return true;
    };

    const signIn = async (email, password) => {
        if (emailValid(email)) {
            try {
                setFromLoading(true);
                setFromSuccess(false);

                let res = await axios.post(SERVER + "/clients/login", {
                    email,
                    password,
                });
                if (res.data.error === "") {
                    setFromSuccess(true);
                    setFromLoading(false);
                    setFromError({ status: false, msg: "" });
                    //A modo de prueba por el momento guardo la info en local storage, en el backend no implemente jwt ni nada complejo.
                    localStorage.setItem(
                        "LOGIN",
                        JSON.stringify({
                            id: res.data.data._id,
                            name: res.data.data.name,
                            email: res.data.data.email,
                        })
                    );
                    return res.data.data;
                } else {
                    throw new Error(res.data.error);
                }
            } catch (err) {
                console.log(err);
                setFromSuccess(true);
                setFromLoading(false);
                setFromError({ status: true, msg: err.message });
                return false;
            }
        }
    };

    const isLogin = () => {
        let login = JSON.parse(localStorage.getItem("LOGIN"));
        if (login === "false") {
            return false;
        }
        return login;
    };

    const signUp = async (data) => {
        console.log(data);
        try {
            setFromLoading(true);
            setFromSuccess(false);

            let res = await axios.post(SERVER + "/clients", data);
            if (res.data.error === "") {
                setFromSuccess(true);
                setFromLoading(false);
                setFromError({ status: false, msg: "" });
                return res.data.data;
            } else {
                throw new Error(res.data.error);
            }
        } catch (err) {
            console.log(err);
            setFromSuccess(true);
            setFromLoading(false);
            setFromError({ status: true, msg: err.message });
            return false;
        }
    };

    return {
        formError,
        formLoading,
        formSuccess,
        emailValid,
        passwordValid,
        emailError,
        passwordError,
        signIn,
        isLogin,
        signUp,
    };
};

export default useLogin;
