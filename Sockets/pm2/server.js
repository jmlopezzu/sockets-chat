    const express = require('express');
    const http = require('http');
    const socketIo = require('socket.io');

    const app = express();
    const server = http.createServer(app);
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('message', (data) => {
            console.log('Message from client:', data);
            io.emit('message', data); // Broadcast the message to all connected clients
        });
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });