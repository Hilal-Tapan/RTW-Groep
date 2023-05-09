// Variables ----------------------------------------------------------------------------------------
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
    loggin.classList.add('hidden'); // Geeft hidden class mee
    chatScreen.classList.remove('hidden'); // Verwijderd hidden class
    socket.emit('focus', true); // Stuur de focus class naar andere klanten
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
  

  
  // Word Description History -------------------------------------------------------------------------
  socket.on('word description history', wordDescriptionHistory => {
    // Doorloop elk data object in de array wordDescriptionHistory
    wordDescriptionHistory.forEach(data => {
      // Roep de functie displayData aan met het huidige data sobject als argument
      displayData(data);
    })
  })
  


  // Chat History -------------------------------------------------------------------------------------
  socket.on('chat history', chatHistory => {
    // Doorloop elk chatobject in de chatHistory array
    chatHistory.forEach(chat => {
      // Roep de functie addChatMessage aan met het huidige chatobject als argument
      addChatMessage(chat);
    })
  })
  
  

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
  