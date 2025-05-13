import React, { useState } from "react";
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    const botResponse = { sender: "bot", text: askQuestion(input) };
    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput("");
  };

  const dummyResponse = (msg) => {
    return "I need to think about it";
  };

  const askQuestion = async (question) => {
    try {
      const response = await axios.post('http://localhost:8000/ask', {
        question,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response.data);
      return response;

    } catch (error) {
      console.error('Error:', error);
      return dummyResponse('');
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('https://serosoft.in/client_assets/IIITB/homepage.jpg')" }}
    >
      <div className="w-[100px] sm:w-[400px] md:w-[500px] max-w-full bg-white bg-opacity-95 rounded-2xl shadow-lg p-4 flex flex-col h-[95vh]">
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-2">
          <img
            src="https://www.iiitb.ac.in/includefiles/userfiles/images/iiitb_logo.png"
            className="w-12 h-12 mb-4 object-contain mx-auto"
          />
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm break-words ${
                  msg.sender === "user"
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200 text-black"
                } max-w-[75%]`}
              >

                <div className="mb-1 font-semibold">
                  {msg.sender === "user" ? "User:" : "Bot:"}
                </div>
                <div>{msg.text}</div>
              </div>
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
        <div className="text-center text-xs italic mt-3 text-gray-500">*For preview only. Verify information from official site.</div>

      </div>
    </div>
  );
};

export default ChatApp;