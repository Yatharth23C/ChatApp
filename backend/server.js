const express = require('express')
const cors= require('cors')
const { Server } = require('socket.io');
const { createServer } = require('http');
const app = express()
const server = createServer(app);
const io = new Server(server, {
cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
},
});
const port = 3000
let queue = []

io.on('connection', (socket) => {
console.log('A user connected');

socket.on('joinRandomQueue',(data)=>{
    
    queue.push(socket.id)
    if(queue.length>=2){
    const user1 = queue.shift()
    const user2 = queue.shift()
    const roomId = `random-${user1}+${user2}`
    
    io.to(user1).emit('randomMatched',roomId)
    io.to(user2).emit('randomMatched',roomId)
    }
   
})
socket.on('randomChat',(data =>{
    const {id,roomName ,text,Uname} = data;
    socket.join(roomName)
    io.to(roomName).emit('randomChat',data);
    
    
}))
socket.on('message', (msg,callback) => {
    
    console.log('Message sent to everyone', msg);
    
    io.emit('message', msg);
    

    if(callback){
    callback({ status: 'success', timestamp: Date.now() });
    }
    
});
socket.on('privatemessage',(msg,callback)=>{
    const code = msg.sc
   
    io.to(code).emit('privatemessage',msg)
    if(callback){
        callback({ status: 'success', timestamp: Date.now() });
        }
    
})

socket.on('disconnect', () => {
    console.log('A user disconnected');
    queue = queue.filter(id=> id!=socket.id)
    console.log(queue);   });});

server.listen(port, () => {
console.log(`Example app listening on port ${port}`)

})
