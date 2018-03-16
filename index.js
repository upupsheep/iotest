const express = require('express');
const app = express();
 
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// 當發生連線事件
io.on('connection', (socket) => {
	console.log('Hello!'); // 顯示Hello!

	// 接收來自前端的 greet 事件
    // 然後回送 greet 事件，並附帶內容
    socket.on("greet", () => {
        socket.emit("greet", "Hi! Client.");
    });

	// 當發生離線事件
	socket.on('disconnection', () => {
		console.log('Bye~'); // 顯示bye~
	});
});
 
 // 注意: 這邊的server原本是app
app.listen(3000, () => {
    console.log("Server Started. http://localhost:3000");
});