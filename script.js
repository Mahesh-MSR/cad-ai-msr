console.log("script.js loaded");

function addMessage(sender, text) {
  const messages = document.getElementById("messages");
  const div = document.createElement("div");

  div.className = sender === "user" ? "user-msg" : "ai-msg";
  div.textContent = text;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  console.log("sendMessage triggered");

  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const response = await fetch(
      "https://mechcad-ai-backend.maheravi2006.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: message })
      }
    );

    const data = await response.json();

    if (data.reply) {
      addMessage("ai", data.reply);
    } else {
      addMessage("ai", "No response from AI");
    }
  } catch (error) {
    console.error(error);
    addMessage("ai", "Backend connection failed");
  }
}
