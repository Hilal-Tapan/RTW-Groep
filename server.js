const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {

});

const axios = require('axios');
const { Console } = require('console');
const port = process.env.PORT || 4242;
const player = require('play-sound')();

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


    io.on('connection', async (socket) => {
        console.log('connected');
    
        sendNewQuestion();
    
        socket.on('chat message', (chat) => {
            console.log(chat)
    
            if (chat.message.toLowerCase().includes(currentQuestion.correctAnswer.toLowerCase())) {
                console.log("correctAnswer")// Check if the chat message includes the correct answer
                questionCount++; // Increment question count
                sendNewQuestion(); // Send a new question
            }
            io.emit('chat message', chat); // broadcast the message to all clients
        });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
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

        console.log('emitted question')
        //  Play the sound effect
        // player.play('public/sounds/sound.mp3', function (err) {
        // if (err) throw err;
    //   });
    // Vraag: deployment cant find suitable audio player?
    }
}
  

app.get('/', (request, response) => {
  response.render('index');
});

http.listen(port, () => {
  console.log('listening on port:', port);
});



// string to lowercase uitproberen
// met een settimeout socket.connection checken elke halve seconden. Als er geen connectie is geef je class mee en deze stijl je met tekst

// AANTEKENINGEN
// on connection ipv on answer waar die nu op staat

// fetch ook in server

// aan de kant van de server de vragen ophalen
// alleen de vraag doorsturen en a b c d multiple choice naar de gebruiker die inlogt
// en dan bij elke msg die je ontvangt checken of het het juiste antwoord is.


// client stuurt alleen berichten door
// server: als het klopt ook nieuwe vraag doorsturen


// const audio = new Audio('/public/sounds/sound.mp3'); // Replace with the path to your sound file
// audio.volume = 0.5; // Adjust the volume as needed

// function sendNewQuestion() {
//     if (questions.length > 0) {
//         currentQuestion = questions[questionCount];

//         console.log(currentQuestion);
        
//         io.emit('question', {
//             questionText: currentQuestion.question.text,
//             choices: [
//                 currentQuestion.correctAnswer,
//                 ...currentQuestion.incorrectAnswers
//             ]
//         });

//         console.log('emitted question')


//         socket.on('chat message', (chat) => {
//             console.log(chat)
            
//             if (chat.message.includes(currentQuestion.correctAnswer)) { 
//                 console.log("correctAnswer")// Check if the chat message includes the correct answer
//                 questionCount++; // Increment question count
//                 audio.play(); // Play the sound effect
//                 sendNewQuestion(); // Send a new question
//             }
//             io.emit('chat message', chat); // broadcast the message to all clients 
//         });
//     }
// }