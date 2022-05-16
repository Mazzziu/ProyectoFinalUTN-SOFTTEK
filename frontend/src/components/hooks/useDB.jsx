import { useState } from "react";
import axios from "axios";

const useDB = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        status: false,
        msg: "",
    });
    const [done, setDoen] = useState({
        status: false,
        data: "",
    });

    const SERVER = import.meta.env.VITE_APP_SERVER;

    const DB = {
        save: (url, data) => {
            setLoading(true);
            return new Promise((resolve, reject) => {
                axios
                    .post(SERVER + url, data)
                    .then((stored) => {
                        resolve(stored);
                        setDoen({
                            status: true,
                            data: stored,
                        });
                        setError({
                            status: false,
                            msg: "",
                        });
                        setLoading(false);
                    })
                    .catch((err) => {
                        reject(err);
                        setDoen({
                            status: true,
                            data: "",
                        });
                        setError({
                            status: true,
                            msg: err.message,
                        });
                        setLoading(false);
                    });
            });
        },
    };

    return { loading, error, done, DB };
};

export default useDB;
