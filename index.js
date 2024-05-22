const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const port = 5000;
app.use(cors()); 

const server = http.createServer(app);

// Initialize socket.io with the created HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'], 
    }
});

// Object to store room data
let roomData = {};

// Event handler for socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Event handler for joining a room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        // Initialize room data if it doesn't exist
        if (!roomData[roomId]) {
            roomData[roomId] = {
                code: '/* Enter your code here */',
                users: new Set()
            };
        }

        // Add user to the room and determine their role (mentor or student)
        roomData[roomId].users.add(socket.id);

        const isMentor = roomData[roomId].users.size === 1;
        const role = isMentor ? 'mentor' : 'student';

        // Emit roleAssigned event to the client with the assigned role
        socket.emit('roleAssigned', role);
        // Emit updateCode event to the client with the code in the room
        socket.emit('updateCode', roomData[roomId].code);

        // Event handler for updating code in the room
        socket.on('updateCode', (code) => {
            roomData[roomId].code = code;
            socket.to(roomId).emit('updateCode', code);
        });

        // Event handler for user disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
            if (roomData[roomId]) {
                roomData[roomId].users.delete(socket.id);
                // Delete the room if it becomes empty
                if (roomData[roomId].users.size === 0) {
                    delete roomData[roomId];
                }
            }
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
