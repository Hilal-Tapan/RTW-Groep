const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
const port = process.env.PORT || 4242;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

let questions = undefined;
let questionsLoaded = false;
let currentQuestion = undefined;
let questionCount = 0;

axios.get('https://the-trivia-api.com/v2/questions')
    .then((response) => {
        questions = response.data;
    })
    .catch((error) => {
        console.error(error);
    });

// async function loadQuestions() {
//     return await axios.get('https://the-trivia-api.com/v2/questions')
// }
// loadQuestions().then(data => {
//     console.log('w000t: ' + data.length)
// })
// Await??

io.on('connection', async (socket) => {
    console.log('connected');
    
    sendNewQuestion();
    

    socket.on('chat message', (chat) => {
        // if chat == correctAnswer -> show feedback + increase count++
        // io.emit questions[count]
        io.emit('chat message', chat); // broadcast the message to all clients 
        // on correct questionCount++ en dan sendNewQuestion()

        
    });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('answer', (answer) => {
    if (!questionsLoaded) {
      io.emit('error', 'Questions are not yet loaded. Please try again later.');
      return;
    }
  });
});

function sendNewQuestion() {
    // update het questionNumber?

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

        console.log('emitted question')
    }
}


app.get('/', (request, response) => {
  response.render('index');
});

http.listen(port, () => {
  console.log('listening on port:', port);
});





// on connection ipv on answer waar die nu op staat



// fetch ook in server

// aan de kant van de server de vragen ophalen
// alleen de vraag doorsturen en a b c d multiple choice naar de gebruiker die inlogt
// en dan bij elke msg die je ontvangt checken of het het juiste antwoord is.


// client stuurt alleen berichten door
// server: als het klopt ook nieuwe vraag doorsturen