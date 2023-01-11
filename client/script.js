import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

// loader function showing the bot getting answers
let loadInterval;

const loader = (el) => {
  el.textContent = " ";
  loadInterval = setInterval(() => {
    el.textContent = ".";
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
