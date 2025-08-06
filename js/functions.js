//-----Zona del chat-----
const responses = {
    'hola': 'Hola ¿Cómo estás?',
    'buenos días': 'Buenos días, Espero que tengas un gran día.',
    'buenas tardes': 'Buenas tardes, ¿En qué puedo ayudarte?',
    'buenas noches': 'Buenas noches, Que descanses.',
    'adiós': 'Adiós Que tengas un buen día.',
    'hasta luego': 'Hasta luego Nos vemos pronto.',
    'cómo estás': 'Estoy bien, gracias por preguntar.',
    'qué puedes hacer': 'Puedo responder a tus preguntas básicas o saludarte.',
    'quién eres': 'Soy un chatbot simple creado para practicar JavaScript.',
    'qué eres': 'Soy un chatbot simple creado para practicar JavaScript.',
    'cuál es tu nombre': 'Puedes llamarme Chaty.',
    'gracias': 'De nada',
    'ayuda': '¿En qué puedo ayudarte? Puedes preguntarme cosas como “¿quién eres?” o “¿qué puedes hacer?”.',
    'estás ahí': 'Sí, Siempre listo para responder.',
    'no entiendo': 'Puedo ayudarte. ¿Qué es lo que no entiendes?',
    'eres real': 'No, estoy hecho de código.',
    'estoy aburrido': 'Podemos charlar o te puedo contar un dato curioso.',
    'dime un dato curioso': '¿Sabías que los pulpos tienen tres corazones?'
}

const defaultResponses = [
    'Lo siento, aun no entiendo eso.',
    '¿Puedes repetirlo de otra manera?',
    'Hmm... no estoy seguro de cómo responder a eso.',
    '¡Interesante! Pero no sé qué decir',
    'Eso todavía no está en mi base de datos.'
]

const chatContainer = document.getElementById('chat-container');
const inputField = document.getElementById('chat-input')
const sendBtn = document.getElementById('send-btn')

//funcion para añadir un mensaje al chat
const addMsg = (text, sender) => {
    const msgEl = document.createElement('div');
    msgEl.classList.add(sender)
    msgEl.innerHTML = `<p>${text}</p>`;
    chatContainer.appendChild(msgEl);
    //scroll automatico
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

//funcion que envia un mensaje dependiendo de la entrada del usuario
const generateResponse = (userText) => {
    const normalize = (text) => text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[¡!¿?,.]/g, ''); // funcion que quita simbolos y acentos de los ,ensajoes del usuario
    const msg = normalize(userText); 

    for(const key in responses){ // se activa si alguna palabra coincide exactamente
        const keyClean = normalize(key);
        if(msg.includes(keyClean)){
            return responses[key]
        }
    }
    
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
}

//funcion que se ejecuta al enviar un mensaje
const sendMsg = () => {
    const userText = inputField.value;
    if(!userText) return;
    addMsg(userText, 'user-txt')
    inputField.value = ''
    setTimeout(() => {
        const botReplay = generateResponse(userText);
        addMsg(botReplay, 'bot-txt')
    }, 300)
}

//se añade funcion al boton y al enter
sendBtn.addEventListener('click', sendMsg);
inputField.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') sendMsg();
})


//----funcion para reiniciar el chat----
const resetBtn = document.getElementById('reset-chat');

resetBtn.addEventListener('click', () => {
    chatContainer.innerHTML = ``
})


//----Zona del boton de modo oscuro-dia----
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light'){
        body.classList.add('light-mode');
        // toggleBtn.querySelector('img').src = ''
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        console.log('cambiando clase')

        if(body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark')
        }
    })
})