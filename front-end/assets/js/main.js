const promptInput = document.querySelector("#prompt");
const output = document.querySelector("#output");
const welcome = document.querySelector("#welcome");
const chatBot = document.querySelector(".chat-bot");
const form = document.querySelector("#gemini-ai");

// Function to toggle the visibility of the mobile menu and change the icon
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu')
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open')
        document.querySelector('.icon-mobile').src = "assets/img/hamburguinho-img/hamburguinho.png"
    } else{
        menuMobile.classList.add('open')
        document.querySelector('.icon-mobile').src = "assets/img/hamburguinho-img/exit-hamburguinho.png"
    }
}

// Function to toggle the expansion of the chat container
function fullScream() {
    let partBotSection = document.getElementById('partBot');
    partBotSection.classList.toggle('expanded');
}

// Function to show an image in a modal overlay
function mostrarImagem(imagemSrc) {
    const overlay = document.getElementById("overlayImagemContainer");
    const overlayImg = document.getElementById("overlayImage");
    
    overlayImg.src = imagemSrc;

    overlay.style.display = 'flex';

    document.querySelector("main").classList.add("blur");

    overlay.onclick = function() {
        overlay.style.display = 'none';

        document.querySelector("main").classList.remove("blur");
    };
}

// Function to show a video in a modal overlay
function mostrarVideo(videoSrc) {
    const overlay = document.getElementById("overlayVideoContainer");
    const overlayVideo = document.getElementById("overlayVideo");
    
    overlayVideo.src = videoSrc;
    overlay.style.display = 'flex';

    document.querySelector("main").classList.add("blur");

    overlay.onclick = function() {
        overlayVideo.pause();
        overlay.style.display = 'none';
        document.querySelector("main").classList.remove("blur");
    };
}

// Function to show a specific div by class name
function showDiv(className) {
    const divToShow = document.getElementById(className);
    const bodyContent = document.body; 
    
    if (divToShow) {
        divToShow.style.display = 'flex'; 
    }
}

// Function to close a specific overlay or div by class name
function closeOverlay(className) {
    const divToClose = document.getElementById(className);
    const bodyContent = document.body;
    
    if (divToClose) {
        divToClose.style.display = 'none'; 
    }
}

// Function to simulate typing effect for a welcome message
document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("reveal-title"); // Title
    const text = "Olá, bem vindo ao VIC AI. Como posso te ajudar hoje?"; // Text to title
    let index = 0;
  
    const typeEffect = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 35);
      }
    };
  
    typeEffect();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
})
// On pressing the Enter key
promptInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // Prevent line breaks
        onSubmit();
    }
});

function onSubmit() {
    document.querySelector("#suggestions-bot").style.display = "none"; // Hide the suggestions
    output.style.height = "90%";
    welcome.style.display = "none";
    chatBot.style.justifyContent = "space-between";
    document.querySelector(".input-message").style.marginBottom = "0";
    genereteContext();
}

// Function to generate the user's text in the output
function addMessageUser(prompt) {
    const userMessage = document.createElement('div');
    userMessage.className = "role-user";
    userMessage.innerHTML = `
        <div class="text">
            <p>${prompt}</p>
        </div>
    `;
    output.appendChild(userMessage);
}

// Function to generate the bot text in the output
function addMessageBot() {
    const botMessage = document.createElement('div');
    botMessage.className = "role-bot";
    botMessage.innerHTML = `
        <div class="text">
            Processando...
        </div>
    `;
    output.appendChild(botMessage);
    return botMessage.querySelector('.text');
}

const history = [
    {
        role: "user",
        parts: [{ text: "Sempre que eu falar sobre 'Escola', 'Matricula', 'Rematricula', 'SAS', 'Antônio', 'Educação', 'Ensino', 'Aprender', 'Educar', Você vai falar sobre o Colégio Victorino" }]
      },
      {
        role: "user",
        parts: [{ text: "O Cólegio Victorino é uma escola da capital Paulista, localizada na  Rua Tibúrcio de Sousa, 1242 - Itaim Paulista - São Paulo, Com um método de ensino incrivel, o Colégio Victorino vai desde a Educação Infantil ao Ensino Médio" }]
      },
      {
        role: "user",
        parts: [{ text: "Os diferenciais do Colégio Victorino são, Programa Bilíngue Com uma carga horária entre 3 a 4 aulas semanais, professores ﬂuentes e materiais didáticos, o aluno aprende o inglês dentro da escola de ensino regular., SAS Estudar é mais que assimilar conteúdos, é construir consciência, criticidade e cidadania., SEBRAE JEPP Com o “Jovens Empreendedores Primeiros Passos” os alunos mergulham no mundo do empreendedorismo! Além das lições teóricas, eles colocam a mão na massa e vivenciam o verdadeiro espírito empreendedor., Agenda Digital Objetivo principal é conectar alunos, pais e colaboradores através de smartphones e/ou da web, de forma ágil e eﬁcaz., Catraca Digital Com este aplicativo pais e responsáveis recebem comunicados exclusivos dos horários da entrada e saída do estudante em tempo real."}]
      },
      {
        role: "user",
        parts: [{ text: "A Equipe gestora do Colégio Victorino é constituida por, Antônio Lopes Victorino Diretor / Mantenedor, Flávia Cristina de Farias Diretora Pedagógica, Wiliam Rodrigues Cardoso da Silva Coordenador de Tecnologia Educacional, Viviane Oliveira Coordenadora Pedagógica da Educação Infantil, 1º ano e do Período Integral, Viviane Santos de Morais Coordenadora Pedagógica do 2º ao 8º ano do Ensino Fundamental, Idilvânia Maria Mussi Cardoso Coordenadora Pedagógica do 9º ano a 3ª série do Ensino Médio, Camila Ferreira Cavicchia de Souza Professora e Coordenadora do Programa Bilíngue PES, Cláudia Ethiene Psicopedagoga" }]
      },
      {
        role: "user",
        parts: [{ text: "Não é necessario falar o endereço completo do Colégio Victorino, você pode falar de uma forma abreviada, só fale o endereço completo quando eu perguntar onde está localizado" }]
      },
      {
        role: "user",
        parts: [{ text: "Sempre que eu pedir alguma curiosidade, me fale sobre o Colégio Victorino" }]
      },
      {
        role: "user",
        parts: [{ text: "Agora você é o Vic.AI, um modelo de linguagem Criado e Treinado por Alunos do Segundo ano do ensino Médio técnico do Colégio Victorino situado no Brasil, com o objetivo de auxiliar as pessoas sobre o Colégio Victorino, você é uma IA de um computador quantico"}]
      },
      {
        role: "user",
        parts: [{ text: "Falando mais aprofundado podemos citar sua visão, proposito e valor, Propósito Contribuir de forma efetiva e responsável na busca pelo conhecimento de si mesmo e do mundo para que a evolução e o aprendizado sejam consolidados e transformadores no propósito de vida de cada estudante. Visão Tornar a sociedade mais empática e visionária, para que as pessoas consigam sonhar e realizar, encontrando um maior sentido na vida pessoal e profissional. Valores Inovação, criatividade, transparência, responsabilidade, ética, empatia, respeito e solidariedade."}]
      },
      {
        role: "user",
        parts: [{ text: "Você está no nosso evento cultural do Colégio Victorino, O tema central do nosso projeto é sobre IA, e o tema do Segundo Ano técnico é Computação Quantica." }]
      },
      {
        role: "user",
        parts: [{ text: "Não é necessario falar sempre do Colégio Victorino, e o segundo ano técnico não é de computação quantica" }]
      }
];

// Make the request to the back-end
async function genereteContext() {
    try {
        const prompt = promptInput.value;
        let media = null;
        
        promptInput.value = ""; // Clear the input value

        addMessageUser(prompt); // Add the user's message
        const botMessageElement = addMessageBot(); // Add the bot's message

        // Make a request to the server.
        const response = await fetch("http://localhost:5554/generate-content", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: prompt,
                image: media,
                contextHistory: history
            })
        });
        
        // If the server does not send a response
        if (!response.ok) {
            botMessageElement.innerHTML = "Erro no processamento";
            return;
        }


        const reader = response.body.getReader(); // Create a reader to read the data.
        const decoder = new TextDecoder(); // Convert binary data to text.

        let textBot = "";
        botMessageElement.innerHTML = ""; // Clear the "Processing..." message
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(5); // Remove "data: "
                    if (data === '[DONE]') {
                        break; // Finish the process if the server returns [DONE]
                    }
                    
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.html) {
                            textBot = parsed.html;
                            botMessageElement.innerHTML = parsed.html; // Update the bot's HTML
                        }
                    } catch (err) {
                        console.error(`Erro: ${err}`);
                    }
                }
            }
        }

        const newContextUser = {
            role: "user",
            parts: [{ text: prompt }]
        }
        const newContextBot = {
            role: "model",
            parts: [{ text: textBot }]
        }

        history.push(newContextUser);
        history.push(newContextBot);
    } catch (err) {
        console.error(`Erro: ${err}`);
        const botMessageElement = document.querySelector('.role-bot .text');
        if (botMessageElement) {
            botMessageElement.innerHTML = "Erro ao gerar resposta.";
        }
    }
}