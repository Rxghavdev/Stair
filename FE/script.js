const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add("chat-message", "user");
  const userMessageContent = document.createElement("div");
  userMessageContent.classList.add("message-content");
  userMessageContent.textContent = message;
  userMessageDiv.appendChild(userMessageContent);
  chatBox.appendChild(userMessageDiv);

  userInput.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  // Send request to backend
  try {
    const response = await fetch("https://stair.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("chat-message", "bot");
    const botMessageContent = document.createElement("div");
    botMessageContent.classList.add("message-content");
    botMessageContent.textContent = data.reply;
    botMessageDiv.appendChild(botMessageContent);
    chatBox.appendChild(botMessageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error("Error:", error);
  }
}
