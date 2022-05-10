const c = require("ansi-colors");
const mongoose = require("mongoose");

const connect = (url) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };
    mongoose
        .connect(url, options)
        .then(() => {
            console.log(c.greenBright("[DB] Success: connected at " + url));
        })
        .catch((err) => {
            console.error(c.red("[DB] Error: couldn't connect to db"));
            console.error(err);
        });
};

module.exports.connect = connect;
