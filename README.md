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
As a web user, I want to be able to play Trivia quiz game online with other people, so i can entertain myself.

---

## 💻 Intallation Guide 💻
### Install nvm
1. To install the server you need node and express. You can do that with nvm. Nvm is package installer where you can install different packages. With this code you can install the latest versions of npm and node in your terminal:
```
nvm install 19.8.1
```

### Clone repo
2. Clone this repository by running:
```
git clone https://github.com/SundousKanaan/RTW-Groep.git
```

### NPM install
3. Install the dependencies by running:
```
npm install 
```

### Start server 
Run the following code to start the server: 
```
node app.js
```

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
* Express
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

![datamodel](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0173.jpg)

![datamodel](https://github.com/Hilal-Tapan/RTW-Groep/blob/main/public/images/IMG_0173.jpg)

- Misschien nog beetje aanvullen beschrijving?

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

## Server Side Code + uitleg hiervan

--- 

## Client Side Code + uitleg hiervan

---

## Trivia.Chat High figh prototype
- insert pictures



# Reflection
## What went well?
The socket start up went pretty well! It was well documented on the website which helped a lot. Also working together with Sundous in the first week went very well! We made a good and hardworking team.

The sound player was actually very easy to achieve. I had never worked with sound before like this and was kinda out of my comfort zone. But i'm glad i tried it out! Even though it does not work in the deploy website, i have definitely learned a new thing from that.

The green border that gets visible after the correct answer is being sent in the chat. This was pretty fun to do and worked out very well. Im happy with the end results.


## What went wrong?
Quite a few things went wrong actually. To start off the Api switch, I started out with math.js, which caused me to loose some time cause i couldn't get it to work. I switched to Trivia Api which was a much better option. 

A second thing is the sound. When someone enters the correct answer, a sounds is being send out to the users. I used play-sound for this, it works perfectly on localhost but when i deploy it it doesnt work. I have to ask my teacher how to fix this, google didn't do me much justice.

Another thing is that the answers from the questions Api were being displayed twice. I did not know how to fix this, it took me hours the other day. One day it was gone and tbh i dont know how i did it. When i was writing code it just suddenly disappeared and i noticed later on. It was a lucky solve!


## Vragen
* heb gitignore later toegevoegd hoe kan ik die node modules toch nog verwijderen
* Me geluidje doet t niet  bij deploy site wel bij localhost, komt door die npm maar is er een makkelijke manier dit te fixen


## TO DO
- [ ] data life cycle diagram
- [X] Localstorage (mee bezig)
- [ ] Handle issues, zet ook in readme
- [ ] Readme (mee bezig)
- [X] documentatie in codes (als laatste kan dit)
- [X] offline status uitwerken
- [x] eventueel ook kleurtje toevoegen naast geluid
- [x] Die tekst daaronder wegkrijgen



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

<!-- Here are some hints for your projects Readme.md! -->

<!-- CHECK :Start out with a title and a descriptin CHECK-->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸  -->

<!-- CHECK: Add a link to your live demo in Github Pages 🌐 -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- CHECK: How about a section that describes how to install this project? 🤓 -->

<!-- CHECK: ...but how does one use this project? What are its features 🤔 -->

<!-- CHECK: What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- CHECK : We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- CHECK: How about a license here? When in doubt use MIT. 📜  -->


<!-- SSSSS -->
