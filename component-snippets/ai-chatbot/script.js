const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector("#file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

// API setup - Demo mode for portfolio showcase
const API_KEY = "#####"; // Replace with your actual Google Gemini API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Demo responses for portfolio showcase when API key is not configured
const demoResponses = [
  "Hello! I'm an AI chatbot powered by Google Gemini API. I can help you with various questions and tasks!",
  "That's an interesting question! In a real implementation, I would use the Gemini API to provide intelligent responses.",
  "I can help with coding questions, general knowledge, creative writing, and much more. What would you like to know?",
  "This is a demo version. To use the full functionality, please configure your Google Gemini API key.",
  "I'm designed to be helpful, harmless, and honest. How can I assist you today?",
  "Feel free to upload images too! I can analyze and discuss visual content when properly configured."
];

let demoResponseIndex = 0;

const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Generate bot response using API or demo mode
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  // Check if API key is configured (not placeholder)
  const isApiConfigured = API_KEY && API_KEY !== "#####" && API_KEY.length > 10;

  if (!isApiConfigured) {
    // Demo mode - simulate API response
    setTimeout(() => {
      const demoResponse = demoResponses[demoResponseIndex % demoResponses.length];
      demoResponseIndex++;

      messageElement.innerText = demoResponse;
      incomingMessageDiv.classList.remove("thinking");
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    return;
  }

  // Add user message to chat history
  chatHistory.push({
    role: "user",
    parts: [
      { text: userData.message },
      ...(userData.file.data ? [{ inline_data: userData.file }] : []),
    ],
  });

  // API request options
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: chatHistory,
    }),
  };

  try {
    // Fetch bot response from API
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    // Extract and display the bot response
    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    messageElement.innerText = apiResponseText;

    // Add bot response to chat history
    chatHistory.push({
      role: "model",
      parts: [
        { text: apiResponseText }
      ],
    });
  } catch (error) {
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    incomingMessageDiv.classList.remove("thinking");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};

// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));

  // Create and display user message
  const messageContent = `<div class="message-text"></div>
                          ${userData.file.data
      ? `<img src=data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`
      : ""
    }`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message"
  );
  outgoingMessageDiv.querySelector(".message-text").textContent =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Simulate bot response with thinking indicator after a dely
  setTimeout(() => {
    const messageContent = `<svg 
            class="bot-avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 1024 1024"
          >
          <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
            ></path>
          </svg>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message",
      "thinking"
    );
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && userMessage && !e.shiftKey && window.inneerWidth > 768) {
    handleOutgoingMessage(e);
  }
});


// Auto resize message input
messageInput.addEventListener("input", (e) => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector("chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle file input change
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = e.target.result.split(",")[1];

    // Store file data in userData
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };

    fileInput.value = "";
  };

  reader.readAsDataURL(file);
});

// Emoji picker setup
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  preview: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  }
});

document.querySelector(".chat-form").appendChild(picker);




sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document
  .querySelector("#file-upload")
  .addEventListener("click", () => fileInput.click());

chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

closeChatbot.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

// Iframe optimization for landing page display
if (window.self !== window.top) {
  document.body.style.transform = 'scale(0.8)';
  document.body.style.transformOrigin = 'top left';
  document.body.style.width = '125%';
  document.body.style.height = '125%';

  // Auto-open chatbot in iframe for demo
  setTimeout(() => {
    document.body.classList.add("show-chatbot");
  }, 1000);
}

// Demo mode indicator
document.addEventListener('DOMContentLoaded', function () {
  if (API_KEY === "#####") {
    const demoIndicator = document.createElement('div');
    demoIndicator.innerHTML = '🚀 Demo Mode - Configure API key for full functionality';
    demoIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff6b6b;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(demoIndicator);

    // Hide after 5 seconds
    setTimeout(() => {
      demoIndicator.style.opacity = '0';
      demoIndicator.style.transition = 'opacity 0.5s';
      setTimeout(() => demoIndicator.remove(), 500);
    }, 5000);
  }
});
