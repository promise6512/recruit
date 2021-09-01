import io from "socket.io-client";
//连接服务器,得到与服务器的连接对象
const socket = io("ws://localhost:3000");
//发送消息
socket.emit('sendMsg', {name:'abc'},(data)=>{
  console.log(data)
});
console.log("客户端向服务器发送消息",{name:"abc"})
socket.on('receiveMsg',(data)=>{
  console.log("客户端接收服务器发送的消息",data)
})
