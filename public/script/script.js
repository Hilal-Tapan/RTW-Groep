const messages = document.querySelector('section ul');
const questionContainer = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-text');
const questionChoices = document.querySelector('#answer-choices');
const input = document.querySelector('#message-input');
const sendMessage = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const loggin = document.querySelector('main section:first-of-type');
const chatScreen = document.querySelector('main section:last-of-type');
const logginButton = document.querySelector('main section:first-of-type > button');

// Add green border around question container
// questionContainer.style.border = "2px solid green";

chatScreen.classList.add('hidden');

// Cancel the enter event on the input
usernameInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage.click();
  }
});

// Login button
logginButton.addEventListener('click', () => {
  loggin.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  socket.emit('focus', true); // Send the focus class to other clients
});

input.addEventListener('input', () => {
  const inputValue = input.value;
  // Do something with the value of the input field here
  console.log(inputValue);
  chatScreen.classList.add('focus');
  socket.emit('focus', true); // Send the focus class to other clients
});

// Username
sendMessage.addEventListener('click', (event) => {
  chatScreen.classList.remove('focus');
  socket.emit('focus', false); // Send the focus class to other clients

  event.preventDefault();
  if (input.value) {
    const chat = {
      username: usernameInput.value,
      message: input.value,
    };
    socket.emit('chat message', chat);
    input.value = '';
  }
});

// Chat message
socket.on('chat message', (msg) => {
  console.log('chat message: ', msg.message);

  const element = document.createElement('li');
  element.textContent = ` ${msg.username}: ${msg.message} `;
  messages.appendChild(element);
  messages.scrollTop = messages.scrollHeight;

  if (msg.username === usernameInput.value) {
    element.classList.add('message');
  }
});

// Add focus class
socket.on('focus', (hasFocus) => {
  if (hasFocus) {
    chatScreen.classList.add('focus');
  } else {
    chatScreen.classList.remove('focus');
  }
});

// Questions
socket.on('question', (data) => {
  const { questionText, choices } = data;
  console.log('received question', questionText, choices);

  questionTitle.textContent = questionText;
  questionChoices.innerHTML = '';
  for (const choice of choices) {
    const li = document.createElement('li');
    li.textContent = choice;
    questionChoices.appendChild(li);
  }

  questionContainer.classList.remove('no-border');
  console.log(questionContainer);
  questionContainer.offsetWidth; // force reflow to trigger animation
  questionContainer.classList.add('no-border');
  setTimeout(() => {
    questionContainer.classList.remove('no-border');
  }, 1000);
});

// Error
socket.on('error', (errorMessage) => {
  const element = document.createElement('li');
  element.textContent = errorMessage;
  element.classList.add('error');
  messages.appendChild(element);
  messages.scrollTop = messages.scrollHeight;
});

// Check socket connection every 500ms
socket.on('connect', () => {
    setInterval(() => {
      if (socket.connected) {
        console.log('Socket is connected');
        // Remove the class if socket is connected
        chatScreen.classList.remove('socket-disconnected');
      } else {
        console.log('Socket is disconnected');
        // Add the class if socket is disconnected
        chatScreen.classList.add('socket-disconnected');
      }
    }, 500);
  });
  


