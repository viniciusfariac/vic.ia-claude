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
