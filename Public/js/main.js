const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from url
const {username,room} = Qs.parse(location.search,{
  ignoreQueryPrefix: true
});

console.log(username,room)

const socket = io();

//Join chatroom
socket.emit('joinRoom',{username, room})



//Message from server
socket.on('message',message => {
  console.log(message);
  outputMessage(message);

 //Scroll Down
 chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatform.addEventListener('submit',event =>{
  event.preventDefault();

  //Get Message
  const msg = event.target.elements.msg.value;

  //Emit message to server
  socket.emit('chatMessage',msg);

  //clear input
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

//Output message to dom
function outputMessage(message){
 const div = document.createElement('div');
 div.classList.add('message');
 div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
 <p class="text">
  ${message.text}
 </p>`;
 document.querySelector('.chat-messages').appendChild(div);
}


