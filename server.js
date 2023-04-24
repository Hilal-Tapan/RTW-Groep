const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
const port = process.env.PORT || 4242;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

let questionsLoaded = false;
// let count = 0;

io.on('connection', async (socket) => {
  console.log('connected');

// const questions = await fetchQuestions();
// const firstQ = questions[count];
// const correctAnswer = firstQ.correctAnswer;
// io.emit etc

  axios.get('https://the-trivia-api.com/v2/questions')
    .then((response) => {
      const questions = response.data;

      if (questions.length > 0) {
          const question = questions[0];
          const choices = [
            question.correctAnswer,
            ...question.incorrectAnswers
          ];
          console.log(choices)
        io.emit('question', {
          questionText: question.question.text,
          choices
        });
      } else {
        io.emit('error', 'No questions found');
      }
    })
    .catch((error) => {
      console.error(error);
      io.emit('error', 'Error fetching questions');
    });


  socket.on('chat message', (chat) => {
    // if chat == correctAnswer -> show feedback + increase count++
    // io.emit questions[count]
    io.emit('chat message', chat); // broadcast the message to all clients
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