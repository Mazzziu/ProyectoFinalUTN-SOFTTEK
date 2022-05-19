import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const useDB = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        msg: "",
    });
    const [done, setDone] = useState({
        status: false,
        data: "",
    });

    const SERVER = import.meta.env.VITE_APP_SERVER;

    const DB = {
        save: (url, data) => {
            console.log("[useDB]: ", data);
            setLoading(true);
            setError({ status: false });
            setDone({ status: false });
            return new Promise((resolve, reject) => {
                axios
                    .post(SERVER + url, data)
                    .then((stored) => {
                        enqueueSnackbar("Guardado Correctamente!", {
                            variant: "success",
                        });
                        setDone({
                            status: true,
                            data: stored.data.data,
                        });
                        setError({
                            status: false,
                            msg: "",
                        });
                        setLoading(false);
                        resolve(stored.data.data);
                    })
                    .catch((err) => {
                        enqueueSnackbar("Error: " + err.message, {
                            variant: "error",
                        });
                        setDone({
                            status: false,
                            data: "",
                        });
                        setError({
                            status: true,
                            msg: err.message,
                        });
                        setLoading(false);
                        reject(err);
                    });
            });
        },
        get: (url) => {
            setLoading(true);
            setError({ status: false });
            setDone({ status: false });
            return new Promise((resolve, reject) => {
                axios
                    .get(SERVER + url)
                    .then((data) => {
                        setDone({
                            status: true,
                            data: data.data.data,
                        });
                        setError({
                            status: false,
                            msg: "",
                        });
                        setLoading(false);
                        resolve(data);
                    })
                    .catch((err) => {
                        enqueueSnackbar("Error: " + err.message, {
                            variant: "error",
                        });
                        setDoen({
                            status: false,
                            data: "",
                        });
                        setError({
                            status: true,
                            msg: err.message,
                        });
                        setLoading(false);
                        reject(err);
                    });
            });
        },
        delete: (url) => {
            setLoading(true);
            setError({ status: false });
            setDone({ status: false });
            return new Promise((resolve, reject) => {
                axios
                    .delete(SERVER + url)
                    .then((data) => {
                        enqueueSnackbar("Eliminado Correctamente!", {
                            variant: "success",
                        });
                        setDone({
                            status: true,
                            data: data.data.data,
                        });
                        setError({
                            status: false,
                            msg: "",
                        });
                        setLoading(false);
                        resolve(data);
                    })
                    .catch((err) => {
                        enqueueSnackbar("Error: " + err.message, {
                            variant: "error",
                        });
                        setDone({
                            status: false,
                            data: "",
                        });
                        setError({
                            status: true,
                            msg: err.message,
                        });
                        setLoading(false);
                        reject(err);
                    });
            });
        },
    };

    return { loading, error, done, DB };
};

export default useDB;
