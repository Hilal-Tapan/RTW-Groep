# Trivia.Chat (RTW)
During this course we will learn how to build a real-time application. We will learn techniques to setup an open connection between the client and the server. This will enable us to send data in real-time both ways, at the same time.

## 👁️ Demo Link! 👁️
[https://rtw-groep-production-324f.up.railway.app/](https://rtw-groep-production-324f.up.railway.app/)

---

## 🖊 Concept 🖊
Trivia.Chat is an environment where users can chat with each other and play a Trivia quiz game. When a user enters the right answer, the next question will be displayed for all users.

This is a project based on the course Real Time Web (RTW) from the minor web, at the University of Amsterdam.

---

## 📖 Job Story 📖
As a web user, I want to be able to play Trivia quiz game online with other people, so I can entertain myself.

---

## 💻 Intallation Guide 💻
### Install nvm
1. To install the server you need node and express. You can do that with nvm. Nvm is package installer where you can install different packages. With this code you can install the latest versions of npm and node in your terminal:
```
nvm install
```

### Clone repo
2. Clone this repository by running:
```
git clone https://github.com/Hilal-Tapan/RTW-Groep
```

### NPM install
3. Install the dependencies by running:
```
npm install 
```

### Start server 
Run the following code to start the server: 
```
node server.js
```

### Bug
Note that sometimes the api doesn't respond quick enough and then im getting an: 
```
TypeError: Cannot read properties of undefined (reading 'length')
```
The way to fix this is just rerunning the ```node server.js``` till it works.

**It was very hard to fix it so after a long session with Justus he said it was fine to keep it this way, since it works most of the time**

---

## 🛠️ Features Combined 🛠️
* Users can chat together online
* Can see if someone is typing
* Can choose a username and which gets displayed with each message
* Can play a Trivia quiz game together
* Own messages are getting displayed on the right side of the screen, the other users on the left side

---

## 💾 Used Technologies 💾
* EJS templating engine
* Node.js
* Axios
* Socket.io
* The Trivia API

---

## Getting started with socket.io
1. The first goal is to set up a simple HTML webpage that serves out a form and a list of messages. We’re going to use the Node.JS web framework express to this end. Make sure Node.JS is installed.

```
npm install express@4
```

2. Once it's installed we can create an index.js file that will set up our application.
```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
```

3. Integrate socket.io 
```
npm install socket.io
```

4. That will install the module and add the dependency to package.json. Now let’s edit index.js to add it:
```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
```

5. Add a script tag in your index.ejs file for.
```html
<script src="/socket.io/socket.io.js"></script>
```

6. To see connections and disconnections add this code to your server.js
```js 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
``` 

7. Make it so that when the user types in a message, the server gets it as a chat message event. The client side js file should now look like this:
```js
  var socket = io();

  var form = document.getElementById('form');
  var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
```

And in the server side js we now add the following code:
```js
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
```

---

# Process
## Sketch for the chat area
Here i made a quick sketch as a reference when coding.
![sketch](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0172.jpg)

### Trying to display a username
One of our features is that the user can choose a username and this gets displayed with each message.

#### Attempt 1
This was our first attempt and it was a good start since it was quite complex. The thing here was that each user only saw their own username displayed. So Sundous only saw the name Sundous being displayed and Hilal only saw the name Hilal being displayed. 

![attempt1](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten.png)

#### Attempt 2
After many tries we still had the same issue. 

![attempt2](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-2.png)

#### Attempt 3
Okay, improvement! It is working! The next step here was to put the username input field in another section and make a "log in" type of page.

![attempt3](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-3.png)

#### Attempt 4
After doing that the user gets in this chat environment where they only see the messages being displayed together with the usernames. So cool!

![attempt4](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-4.png)

--- 

### Is typing feature
We thought it would be cool if the user would get information about when someone is typing, so we added this feature!

![is-typing](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-5.png)

---

### Different colors for each user
When there are many people in the chatting area, it is hard to seperate each user. So we added different colors to each user.

![colors](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-6.png)

---

### Position of each user
We thought it was important to display yourself on the right, and all the other users on the left, to fit the chatroom User Experience (UX). This really improved the chatting experience. 

![location](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/samen-chatten-7.png)

---

## Prototype of the chat.io area
### Log in page
![proto](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/prototype.png)

### Chat area
![proto](https://github.com/SundousKanaan/RTW-Groep/blob/hilal/readme-images/prototype-1.png)

---

# Concept
## Ideas
![ideas](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0174.jpg)

I had a couple ideas in mind for the Api part of this project. At first i wanted to do a math solver where users in the chat had to solve a math problem. I had already started on this code with math.js but i did not manage to get it working like i wanted and this resulted in losing motivation for the concept. Also im really bad at math so idk why i picked that idea. 

After looking for similar Quiz type Api's i found the Trivia Api. I looooove to play trivia pursuit so this sounded perfect. The Api is a rest Api and its well documented to i went with this idea.

The meme rater and furniture bidding could've also worked out, but I could not find good Api's for these concepts.

To check out the code for the Math.js concept you can go to my hilal branch from this repo.

---

# External data source
## The Trivia Api
The Trivia API is a web-based service that provides developers with a simple and easy-to-use interface for accessing a vast collection of trivia questions and answers. With over 30,000 questions available in multiple categories, the API offers a wealth of information for developers looking to create trivia-based applications or games.

The API uses RESTful web service architecture and returns data in JSON format, making it easy to integrate into a wide variety of programming languages and platforms. In addition to the questions and answers themselves, the API also provides additional metadata about each question, such as its difficulty level, category, and more.

Whether you're building a trivia game, a quiz app, or simply looking to add some fun and educational content to your website, The Trivia API provides a comprehensive and reliable source of trivia data that is sure to delight and engage your users.

[The Trivia Api](https://the-trivia-api.com/docs/v2/#section/Introduction)

## The code
```js
axios.get('https://the-trivia-api.com/v2/questions')
    .then((response) => {
        questions = response.data;
    })
    .catch((error) => {
        console.error(error);
    });

function sendNewQuestion() {
    if (questions.length > 0) {
        currentQuestion = questions[questionCount];

        console.log(currentQuestion);

        io.emit('question', {
            questionText: currentQuestion.question.text,
            choices: [
                currentQuestion.correctAnswer,
                ...currentQuestion.incorrectAnswers
            ]
        });
    }}
```

This code makes an HTTP GET request to an API endpoint using the Axios library. The endpoint is "https://the-trivia-api.com/v2/questions", and the response is stored in a variable called questions. 

The sendNewQuestion() function uses the questions array to send a new question to a client using web sockets. The function logs the currentQuestion object to the console and emits a message with the question and answer choices to all connected clients using the io.emit() method. The emitted message has a question event and contains an object with a questionText property, which holds the text of the current question, and a choices property, which is an array of answer choices. The answer choices array is constructed by combining the correctAnswer property of the currentQuestion object with the incorrectAnswers array using the spread operator (...).

## Data modelling
I made a data model based on the response you get from the Api.

```json
[
{
"category": "music",
"id": "622a1c357cc59eab6f94fd79",
"correctAnswer": "The Righteous Brothers",
"incorrectAnswers": [
"The Isley Brothers",
"Wham!",
"The Temptations"
],
"question": {
"text": "Who Were Bobby Hatfield & Bill Medley?"
},
"tags": [
"people",
"music"
],
"type": "text_choice",
"difficulty": "hard",
"regions": [],
"isNiche": false
}, ...
]
```

![datamodel](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0178.jpg)


## Data Lifecycle Diagram
![lifecycle](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0180.jpg)

Dit is mijn data lifecycle diagram. Het bestaat uit de client, de server en de API. In de client word gecheckt of iemand connected of disconnected is en dit word gestuurd naar de server. Messages en is typing word naar beide kanten gestuurd. Chat history word gestuurd naar de client vanuit de server. De data van de api wordt eerst naar de server gestuurd en daarna naar de client. Als de user de correctAnswer meegeeft in de chat word die data terug gestuurd naar de server en word er een request gedaan naar een nieuwe vraag en antwoorden. Er vinden dus verschillende real time events plaats tussen de client en server.

---

## Real Time Events
### Online Chatting
Users can chat with each other online. This was done using socket.io.

### Usernames
Users can set a username at the beginning that will be displayed with every message.

### Typing...
When someone is typing, all users will see this in the chat.

### Positions
The position of your own messages will be on the right and all other users' messafes will be on the left. This way the user can easily see their own messages in the chat room

### Correct Answers
If the chat message contains the correct answer for that specific question, the next question will be displayed for all users. The users will see a green border around the question area, which is an indicator for correct answer. They will also hear a "bling!" sound which is also an indicator.

---

## Server Side Code and what it does
``` js
// variables --------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
});

const axios = require('axios');
const port = process.env.PORT || 4242;
const player = require('play-sound')();

// View engine en static files ---------------------------------------------------------------------
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Chat geschiedenis -------------------------------------------------------------------------------
const historySize = 50;
let chatHistory = [];

// Variabelen voor de trivia game ------------------------------------------------------------------
let questions = undefined;
let currentQuestion = undefined;
let questionCount = 0;

// Fetch vragen van API ----------------------------------------------------------------------------
axios.get('https://the-trivia-api.com/v2/questions')
    .then((response) => {
        questions = response.data;
    })
    .catch((error) => {
        console.error(error);
    });

// Socket IO listeners -----------------------------------------------------------------------------
io.on('connection', async (socket) => {
    console.log('connected');

    // Functie die ik oproep
    sendNewQuestion();
    
    socket.on('chatHistory', () => {
        socket.emit('chatHistory', chatHistory);
    })

    // Ontvang chat messages
    socket.on('chat message', (chat) => {
        console.log(chat)

        // Verwijder oudere berichten als er meer dan historySize berichten in de geschiedenis zitten
        while (chatHistory.length >= historySize) {
            chatHistory.shift();
        }
        chatHistory.push(chat);
        console.log( ' chatHistory',chatHistory)

        // Controleer of het antwoord correct is en stuur een nieuwe vraag als dat het geval is
        // Met de toLowerCase accepteer ik zowel lowercase als uppercase letters
        // Met includes accepteerd die de correctAnswer ook als er andere woorden bij zijn geschreven.
        if (chat.message.toLowerCase().includes(currentQuestion.correctAnswer.toLowerCase())) {
            console.log("correctAnswer")
            questionCount++; // Volgende trivia vraag bij correctAnswer 
            sendNewQuestion(); // Stuur een nieuwe vraag functie
        }
        io.emit('chat message', chat); // Stuur de chat message naar alle clients
    });

    // Wanneer de gebruiker uitlogt, print dit in de console
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Deze functie stuurt een nieuwe vraag naar alle clients -------------------------------------------------
function sendNewQuestion() {
    // Controleer of er nog vragen zijn om te versturen
    if (questions.length > 0) {
        // Haal de huidige vraag op
        currentQuestion = questions[questionCount];

        console.log(currentQuestion);

        // Stuur de vraag en antwoord-keuzes naar alle clients
        io.emit('question', {
            questionText: currentQuestion.question.text, // Stuur de tekst van de vraag
            choices: [
                currentQuestion.correctAnswer, // Stuur het juiste antwoord
                ...currentQuestion.incorrectAnswers // Stuur alle foute antwoorden
            ]
        });

        console.log('emitted question');

        // Speel geluid af. 
        // Bij de localhost werkt deze, maar niet bij railwap.app. Dit komt omdat ik het in
        // de server heb gedaan en niet in de client. Helaas geen tijd gehad dit aan te passen.

        // player.play('public/sounds/sound.mp3', function (err) {
        //     // Behandel eventuele fouten die tijdens het afspelen optreden
        //     if (err) throw err;
        // });
    }
}

// Homepage -------------------------------------------------------------------------------------
app.get('/', (request, response) => {
    response.render('index');
});

// Start server op de opgegeven port ------------------------------------------------------------
http.listen(port, () => {
    console.log('listening on port:', port);
});
```

This code is a server-side JavaScript code using the Express.js framework and Socket.IO library to implement a real-time chat application with a trivia game feature. Here's a summary of what the code does:

- It imports necessary modules, sets up the server, and creates an Express application.
- The server listens on a specified port (either the value from the environment variable PORT or 4242 if not provided).
- It sets the view engine to EJS and serves static files from the "public" directory.
- It defines variables and arrays to store chat history and trivia game data.
- It makes an HTTP GET request to an external API ('https://the-trivia-api.com/v2/questions') to fetch trivia questions and stores them in the "questions" variable.
- It sets up Socket.IO listeners for client connections and disconnections.
- Upon a new client connection, it emits a 'question' event to send a new trivia question to all connected clients.
- It listens for 'chat message' events from clients and handles the chat messages, including storing them in the chat history and checking if the answer is correct.
- When a correct answer is received, it increments the question count and sends a new question to all clients.
- The 'chatHistory' event is used to send the chat history to the client upon request.
- Finally, the server starts listening for incoming requests on the specified port.
  
Overall, this code sets up a server that allows clients to connect, chat in real-time, and play a trivia game. It communicates with clients using Socket.IO to exchange messages and updates.

--- 

## Client Side Code and what it does
```js
// Variables ----------------------------------------------------------------------------------------
const messages = document.querySelector('section ul');
const questionContainer = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-text');
const questionChoices = document.querySelector('#answer-choices');
const input = document.querySelector('#message-input');
const sendMessage = document.querySelector('#message-button');
const usernameInput = document.querySelector('#username-input');
const logginScreen = document.querySelector('main section:first-of-type');
const chatScreen = document.querySelector('main section:last-of-type');
const logginButton = document.querySelector('main section:first-of-type > button');

chatScreen.classList.add('hidden');

// Cancel the enter event on the input --------------------------------------------------------------
usernameInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) { // Als de ingedrukte toets de enter-toets is
      event.preventDefault(); // Voorkomt de default action (het indienen van het formulier)
      sendMessage.click(); // Klikt programmatisch op de knop "verzenden"
    }
  });

// Login button -------------------------------------------------------------------------------------
logginButton.addEventListener('click', () => {
    logginScreen.classList.add('hidden'); // Geeft hidden class mee
    chatScreen.classList.remove('hidden'); // Verwijderd hidden class
    socket.emit('focus', true); // Stuur de focus class naar andere klanten
    socket.emit('chatHistory')
  });


input.addEventListener('input', () => {
    const inputValue = input.value;
    // Doe hier iets met de waarde van het invoerveld
    console.log(inputValue);
    chatScreen.classList.add('focus'); // Voegt the "focus" class aan de chat screen
    socket.emit('focus', true); // Stuur de focus class naar andere klanten
  });

// Username -----------------------------------------------------------------------------------------
sendMessage.addEventListener('click', (event) => {
    chatScreen.classList.remove('focus'); // Verwijdert de "focus" class 
    socket.emit('focus', false); // Stuur de focus class naar andere klanten
  
    event.preventDefault(); // Voorkomt de default action (het indienen van het formulier)
    if (input.value) { // Als het invoerveld een waarde heeft
      const chat = {
        username: usernameInput.value, // Stelt de eigenschap "username" in op de waarde van het invoerveld gebruikersnaam
        message: input.value, // Stelt de eigenschap "message" in op de waarde van het berichtinvoerveld
      };
      socket.emit('chat message', chat); // Stuurt het chatbericht naar de server
      input.value = ''; // Wist het invoerveld
    }
  });

// Chat message ------------------------------------------------------------------------------------
socket.on('chat message', (msg) => {
    console.log('chat message: ', msg.message); // Logt het chatbericht naar de console
  
    const element = document.createElement('li'); // Maakt een nieuw lijstitemelement
    element.textContent = ` ${msg.username}: ${msg.message} `; // stelt de tekstinhoud van de list item in op het chatbericht
    messages.appendChild(element); // Voegt het lijstitem toe aan de berichtenlijst
    messages.scrollTop = messages.scrollHeight; // Scrolt de berichtenlijst naar beneden
  
    if (msg.username === usernameInput.value) { // Als het chatbericht is verzonden door de huidige gebruiker
      element.classList.add('message'); // Voegt de klasse "message" toe aan het lijstitem
    }
  });

// Add focus class ----------------------------------------------------------------------------------
socket.on('focus', (hasFocus) => {
    if (hasFocus) { // Als het bericht van de server aangeeft dat deze client de focus heeft
      chatScreen.classList.add('focus'); // Voegt de klasse "focus" toe aan het chatscherm
    } else { 
      chatScreen.classList.remove('focus'); // Verwijdert de klasse "focus" van het chatscherm
    }
  });

// Questions ----------------------------------------------------------------------------------------
socket.on('question', (data) => {
    // Extraheer "questionText" en "choices" uit het gegevensobject met behulp van destructurering
    const { questionText, choices } = data;
    console.log('received question', questionText, choices);
  
    // Stel de tekstinhoud van het element questionTitle in op questionText
    questionTitle.textContent = questionText;
    // Verwijder alle child nodes uit het element questionChoices
    questionChoices.innerHTML = '';
    // Voeg elke keuze toe aan het element questionChoices als een nieuw lijstitem
    for (const choice of choices) {
      const li = document.createElement('li');
      li.textContent = choice;
      questionChoices.appendChild(li);
    }
  
    // Verwijder de klasse 'no-border' uit het element questionContainer
    questionContainer.classList.remove('no-border');
    console.log(questionContainer);
    questionContainer.offsetWidth; // force reflow
    // Class 'no-border' toevoegen na 1 seconde terug naar questionContainer
    questionContainer.classList.add('no-border');
    setTimeout(() => {
      questionContainer.classList.remove('no-border');
    }, 1000);
  });
  
  // Chat History -------------------------------------------------------------------------------------
  socket.on('chatHistory', (chatHistory) => {
    console.log('chatHistory', chatHistory);
    for (const chat of chatHistory) {
      const element = document.createElement('li');
      element.textContent = ` ${chat.username}: ${chat.message} `;
      messages.appendChild(element);
    }
    messages.scrollTop = messages.scrollHeight;
  });

  // Error --------------------------------------------------------------------------------------------
  socket.on('error', (errorMessage) => {
    // Maak een nieuw li-element om de foutmelding weer te geven
    const element = document.createElement('li');
    element.textContent = errorMessage;
    element.classList.add('error');
    // Voeg het nieuwe li-element toe aan het berichten-element
    messages.appendChild(element);
    // Scrol naar de onderkant van het berichtenelement om het nieuwe foutbericht weer te geven
    messages.scrollTop = messages.scrollHeight;
  });
  
  // Offline ------------------------------------------------------------------------------------------
  socket.on('connect', () => {
    // Stel een interval in om de status van de socketverbinding elke 500 ms te controleren
    setInterval(() => {
      // Als de socket is connected, verwijdert 'socket-disconnected' class uit het chatScreen-element
      if (socket.connected) {
        console.log('Socket is connected');
        chatScreen.classList.remove('socket-disconnected');
      } else { // Als de socket is disconnected, voegt class 'socket-disconnected' toe aan het chatScreen-element
        console.log('Socket is disconnected');
        chatScreen.classList.add('socket-disconnected');
      }
    }, 500);
  });
```

This code is client-side JavaScript code that works with the server-side code to implement the front-end functionality of a real-time chat application with a trivia game feature. Here's a summary of what the code does:

- It adds and removes classes to hide and show different sections of the chat application.
- It listens for the enter key event on the username input field and triggers the sendMessage button click event programmatically.
- It listens for the click event on the login button and hides the login screen, shows the chat screen, and emits 'focus' and 'chatHistory' events to the server.
- It listens for the input event on the message input field and adds the 'focus' class to the chat screen and emits the 'focus' event to the server.
- It listens for the click event on the sendMessage button, emits the 'chat message' event to the server with the username and message, and clears the input field.
- It listens for the 'chat message' event from the server and displays the received chat message in the chat area. The message from the current user is styled differently.
- It listens for the 'focus' event from the server and adds or removes the 'focus' class to/from the chat screen based on the received focus status.
- It listens for the 'question' event from the server and displays the received trivia question and choices in the question area. It adds and removes a CSS class to create a border animation effect as a state.
- It listens for the 'chatHistory' event from the server and displays the chat history in the chat area.
- It listens for the 'error' event from the server and displays the received error message in the chat area with a specific styling, as an error state.
- It listens for the 'connect' event from the server and checks the socket connection status periodically. 
- It adds or removes a CSS class based on the connection status to indicate offline or online status.

Overall, this code handles various user interactions, communicates with the server using Socket.IO events, and updates the UI of the chat application accordingly.

---

## Trivia.Chat High figh prototype
![1](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/eind-1.png)

![2](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/eind-2.png)

![3](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/eind-3.png)

![4](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/eind-4.png)


# Reflection
## What went well?
The socket start up went pretty well! It was well documented on the website which helped a lot. Also working together with Sundous in the first week went very well! We made a good and hardworking team.

The sound player was actually very easy to achieve. I had never worked with sound before like this and was kinda out of my comfort zone. But i'm glad i tried it out! Even though it does not work in the deploy website, i have definitely learned a new thing from that.

The green border that gets visible after the correct answer is being sent in the chat. This was pretty fun to do and worked out very well. Im happy with the end results.


## What went wrong?
Quite a few things went wrong actually. To start off the Api switch, I started out with math.js, which caused me to loose some time cause i couldn't get it to work. I switched to Trivia Api which was a much better option. 

A second thing is the sound. When someone enters the correct answer, a sounds is being send out to the users. I used play-sound for this, it works perfectly on localhost but when i deploy it it doesnt work. I have to ask my teacher how to fix this, google didn't do me much justice.

Another thing is that the answers from the questions Api were being displayed twice. I did not know how to fix this, it took me hours the other day. One day it was gone and tbh i dont know how i did it. When i was writing code it just suddenly disappeared and i noticed later on. It was a lucky solve!



## Things i would implement if i had more time
* Fix the sound on the deploy website when someone enters the correctAnswer. Now it only works on localHost.
* Add point count to people
* "user joined and left chat" functionality
* Some answer words are getting cut on weird places. It's a weird word wrap i think but idk how to fix it and if i had more time i wouldve. 

--- 

## Peerreviews
### Uppercase and lowercase
During a peerreview i got feedback that none of the answers were seen as correct. I immediately knew this was because in the Api some letters are uppercase. I fixed this by adding a toLowercase.

```js
 if (chat.message.toLowerCase().includes(currentQuestion.correctAnswer.toLowerCase())) {
            console.log("correctAnswer")
            questionCount++; // Volgende trivia vraag bij correctAnswer 
            sendNewQuestion(); // Stuur een nieuwe vraag functie
        }
```

### Data Life Cycle
At first my data life cycle was not correct, in my cycle i linked the api directly to my client but it should've been linked to my client since im fetching via my server.

### Space in api answers
The api has sometimes a space after a word. When you don't put this space in your chat it doesn't accept the answer. I tried to fix this with includes so when you put the right answer in a sentence it is accepted. But when you dont use a sentece it wont accept it because ur not using a space.

### .gitignore
I forgot to put my .DS_Store and node-modules in my gitignore file. I noticed this after a peerreview from someone. I immediately fixed it.

---

## Sources
* https://www.npmjs.com/package/nodemon 
* https://fonts.adobe.com/fonts/interstate 
* https://www.git-tower.com/learn/git/faq/git-pull-origin-master
* https://adaptable.io/ 
* https://railway.app/ 
* https://socket.io/get-started/chat/ 
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes 
* https://the-trivia-api.com/docs/v2 
* https://cloudconvert.com/wav-to-mp3
* https://www.npmjs.com/package/play-sound
* https://www.freecodecamp.org/news/gitignore-what-is-it-and-how-to-add-to-repo/

