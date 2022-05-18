import { useState } from "react";
import axios from "axios";

const useDB = () => {
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
            return new Promise((resolve, reject) => {
                axios
                    .post(SERVER + url, data)
                    .then((stored) => {
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
    };

    return { loading, error, done, DB };
};

export default useDB;
