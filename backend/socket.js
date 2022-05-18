const socket = {};

function connect(server) {
    socket.io = require("socket.io")(server, {
        cors: {
            origin: "*",
        },
    });
}

module.exports = { connect, socket };
