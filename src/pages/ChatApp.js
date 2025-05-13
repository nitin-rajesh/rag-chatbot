import React, { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    const botResponse = { sender: "bot", text: dummyResponse(input) };
    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  const dummyResponse = (msg) => {
    return "Hello";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('https://serosoft.in/client_assets/IIITB/homepage.jpg')" }}
    >
      <img src="https://www.iiitb.ac.in/includefiles/userfiles/images/iiitb_logo.png" className="w-20 h-20 mb-4 object-contain" />
      <div className="w-[100px] sm:w-[400px] md:w-[500px] max-w-full bg-white bg-opacity-95 rounded-2xl shadow-lg p-4 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`self-${msg.sender === "user" ? "end" : "start"} px-4 py-2 rounded-full max-w-xs text-s ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="w-full flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 text-xs rounded-l-full border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-xs text-white px-4 rounded-r-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
