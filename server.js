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






// AANTEKENINGEN ----------------------------------------------------------------------------------

// string to lowercase uitproberen
// met een settimeout socket.connection checken elke halve seconden. Als er geen connectie is geef je class mee en deze stijl je met tekst

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