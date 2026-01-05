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
  const userText = input.value.trim();

  if (!userText) return;

  // Show user message
  addMessage("user", userText);

  // Clear input
  input.value = "";

  try {
    console.log("Sending prompt:", userText);

    const response = await fetch(
      "https://mechcad-ai-backend.maheravi2006.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: userText   // 🔥 THIS MUST BE userText
        })
      }
    );

    const data = await response.json();

    console.log("AI response:", data);

    if (data.reply) {
      addMessage("ai", data.reply);
    } else {
      addMessage("ai", "No response from AI");
    }
  } catch (err) {
    console.error(err);
    addMessage("ai", "Backend connection failed");
  }
}
