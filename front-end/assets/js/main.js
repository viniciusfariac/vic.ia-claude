const output = document.querySelector(".output-message");
const welcome = document.querySelector(".greeting");
const chatBot = document.querySelector(".chat-bot");
const promptInput = document.getElementById("prompt");

function menuShow() {
    let menu = document.querySelector('.nav-menu');
    let icon = document.querySelector('.icon');
    let partBot = document.getElementById("partBot");
    let suggestion = document.getElementById("suggestion");
    let suggestionLi = document.getElementById("suggestion-li")
    
    // Verifica se o menu tem a classe 'open'
    if(menu.classList.contains('open')) {
        menu.classList.remove('open');  // Remove a classe open
        icon.src = "assets/img/hamburguinho.png";  // Muda a imagem para o ícone original
        partBot.classList.remove('open')
    } else {
        menu.classList.add('open');  // Adiciona a classe open
        icon.src = "assets/img/xLogo.png";  // Muda a imagem para o ícone de fechar
        partBot.classList.add('open');
    }
}

function menuShowMobile() {
  let menu = document.querySelector('.mobile-menu');
  let icon = document.querySelector('.icon');
  let partBot = document.getElementById("partBot");
  let suggestion = document.getElementById("suggestion");
  let suggestionLi = document.getElementById("suggestion-li")
  
  // Verifica se o menu tem a classe 'open'
  if(menu.classList.contains('open')) {
      menu.classList.remove('open');  // Remove a classe open
      icon.src = "assets/img/hamburguinho.png";  // Muda a imagem para o ícone original
      partBot.classList.remove('open')
  } else {
      menu.classList.add('open');  // Adiciona a classe open
      icon.src = "assets/img/xLogo.png";  // Muda a imagem para o ícone de fechar
      partBot.classList.add('open');
  }
}

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

// On pressing the Enter key
promptInput.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
      e.preventDefault(); // Prevent line breaks
      document.querySelector("#suggestion").style.display = "none"; // Hide the suggestions
      output.style.height = "90%";
      welcome.style.display = "none";
      chatBot.style.justifyContent = "space-between";
      document.querySelector(".input-message").style.marginBottom = "0";
      genereteContext();
  }
});

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
              image: media
          })
      });
      
      // If the server does not send a response
      if (!response.ok) {
          botMessageElement.innerHTML = "Erro no processamento";
          return;
      }


      const reader = response.body.getReader(); // Create a reader to read the data.
      const decoder = new TextDecoder(); // Convert binary data to text.

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
                          botMessageElement.innerHTML = parsed.html; // Update the bot's HTML
                      }
                  } catch (err) {
                      console.error(`Erro: ${err}`);
                  }
              }
          }
      }
  } catch (err) {
      console.error(`Erro: ${err}`);
      const botMessageElement = document.querySelector('.role-bot .text');
      if (botMessageElement) {
          botMessageElement.innerHTML = "Erro ao gerar resposta.";
      }
  }
}