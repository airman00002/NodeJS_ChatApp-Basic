(function connect(){
     let socket =io.connect('http://localhost:3000')
     //*รับค่า input
     let username = document.querySelector('#username')
     let usernameBTN = document.querySelector('#usernameBTN')
     let curUsername = document.querySelector('.card-header')

     //* btn change
     usernameBTN.addEventListener('click',(event) =>{
          console.log(username.value)
          socket.emit('change_username',{username:username.value})
          curUsername.textContent = username.value
          username.value =''
     })

     //*ส่งข้อความ
     let message = document.querySelector('#message')
     let messageBTN = document.querySelector('#messageBTN')
     let messageList = document.querySelector('#messageList')

      //* btn send
      messageBTN.addEventListener('click',(event)=>{
           console.log(message.value)
          socket.emit('new_message',{message:message.value})
          message.value =''
      })

      socket.on('received_message',(data)=>{
          console.log(data)
          let listItem = document.createElement('li')
          listItem.classList.add('list-group-item')
          listItem.textContent = data.username + " : " + data.message
          messageList.appendChild(listItem)
     })

     let info = document.querySelector('.info')
     message.addEventListener('keypress',(event)=>{
          socket.emit('typing')
     })

     socket.on('typing',data=>{
          info.textContent = data.username + " กำลังพิมพ์..."
          setTimeout(()=>{
               info.textContent =''
          },3000) 
     })

})()
//*client ต้องส่ง event ให้ server จากนั้น server จะเปลี่ยนข้อมูลให้