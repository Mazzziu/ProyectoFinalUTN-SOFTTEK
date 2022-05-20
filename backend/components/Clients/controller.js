const Model = require("./model");

const findClient = (data) => {
    return new Promise((resolve, reject) => {
        console.log(data);
        if (Object.keys(data).length === 0) reject("faltan parámetos");

        let query = {};
        if (data.id) {
            query = { _id: data.id };
        }
        if (data.email) {
            query = { email: data.email };
        }

        Model.find(query)
            .then((client) => {
                resolve(client);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const saveClient = (data) => {
    return new Promise(async (resolve, reject) => {
        if (
            data.hasOwnProperty("name") &&
            data.hasOwnProperty("email") &&
            data.hasOwnProperty("password")
        ) {
            let searchClient = await findClient({ email: data.email });
            console.log(data.email);
            console.log(searchClient);

            if (searchClient.length > 0) {
                reject(`Email ${data.email} ya se encuentra en uso`);
            } else {
                const client = new Model({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                });
                client
                    .save()
                    .then((stored) => resolve(stored))
                    .catch((err) => reject(err));
            }
        } else {
            reject("Faltan parametros");
        }
    });
};

const login = (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        if (data.hasOwnProperty("email") && data.hasOwnProperty("password")) {
            let searchClient = await findClient({ email: data.email });
            if (searchClient.length === 0) {
                reject("Contraseña o email incorrecto");
            }
            if (searchClient.length > 0) {
                if (String(searchClient[0].password) === String(data.password))
                    resolve(searchClient[0]);

                reject("Contraseña o email incorrecto");
            }
        } else {
            reject("Faltan parametros");
        }
    });
};

module.exports = {
    saveClient,
    findClient,
    login,
};
