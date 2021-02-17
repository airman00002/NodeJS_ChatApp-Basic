const express = require('express')
const app = express()

const socketIO = require('socket.io')

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res,next) => {
     res.render('index')
})

const server = app.listen(process.env.PORT || 3000,()=>{
     console.log('Server is running !!')
})

const io = socketIO(server)

io.on('connection',(socket)=>{
     console.log('New user connected !!')

     socket.username = 'Anonymous'

     socket.on('change_username',(data)=>{
          socket.username = data.username
     })
     //*server ส่ง username && message
     socket.on('new_message',(data)=>{
          console.log('New message received')
          io.sockets.emit('received_message',{username:socket.username,message:data.message})
     })
    //*กำลังพิม
    socket.on('typing',(data)=>{
         socket.broadcast.emit('typing',{username:socket.username})
    })

})