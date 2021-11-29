const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hello', (req, res) => {
    res.status(200).send('Hello World');
})

let messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS',
    nickname: 'Bot - Craftianos'
}];

io.on('connection', (socket) => {
    console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado ⚡');

    socket.emit('messages', messages);

    socket.on('add-message', (data) => {
        messages.push(data);
    
        io.sockets.emit('messages', messages)
    });
})

server.listen('8080', function() {
    console.log('Server funcionando en http://localhost:8080/');
});