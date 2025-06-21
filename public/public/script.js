const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const clearBtn = document.getElementById("clearChat");

chatForm.onsubmit = async (e) => {
  e.preventDefault();
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage("user", msg);
  userInput.value = "";

  appendMessage("bot", "⌛ جاري التفكير...");

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  removeLastBotPlaceholder();
  appendMessage("bot", data.reply);
};

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = role === "user" ? "text-right text-green-400" : "text-left text-purple-300";
  div.innerHTML = role === "bot" ? `🤖: ${text}` : `🧑‍💻: ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLastBotPlaceholder() {
  const last = chatBox.lastChild;
  if (last && last.innerText.includes("⌛")) chatBox.removeChild(last);
}

clearBtn.onclick = () => {
  chatBox.innerHTML = "";
};
