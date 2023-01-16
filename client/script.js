import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

// loader function showing the bot getting answers
let loadInterval;

const loader = (el) => {
  el.textContent = " ";
  loadInterval = setInterval(() => {
    el.textContent += ".";
    if (el.textContent === "....") {
      el.textContent === " ";
    }
  }, 300);
};

// function make the answers of the bot slowly and readable
const typeText = (el, text) => {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      el.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
};

const chatStripe = (isAi, value, uniqueId) => {
  return `
    <div class="wrapper ${isAi && "ai"}">
        <div class="chat">
            <div class="profile">
                <img 
                  src=${isAi ? bot : user} 
                  alt="${isAi ? "bot" : "user"}" 
                />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
        </div>
    </div>
`;
};

const handelSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // chatStripe of User
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // chatStripe of Bot
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
};

form.addEventListener("submit", handelSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handelSubmit(e);
  }
});
