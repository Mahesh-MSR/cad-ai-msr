console.log("script.js loaded");

const BACKEND_URL = "https://mechcad-ai-backend.maheravi2006.workers.dev";

async function sendMessage() {
  console.log("sendMessage triggered");

  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");
  const text = input.value.trim();

  if (!text) return;

  messages.innerHTML += `<div class="user-msg">${text}</div>`;
  input.value = "";

  const loading = document.createElement("div");
  loading.className = "ai-msg";
  loading.textContent = "AI is thinking...";
  messages.appendChild(loading);

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    });

    const data = await response.json();
    loading.textContent = data.reply || "No response";

  } catch (e) {
    loading.textContent = "Backend connection failed";
    console.error(e);
  }
}
