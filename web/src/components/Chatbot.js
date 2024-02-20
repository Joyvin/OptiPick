"use client";
import React, { useRef } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";
import "../styles/style.css";
import "dotenv/config";

// Initialize the model
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyDDqJKLryWpHwHlX66xe3WEV5p_5hG5wmI");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let history = [];


async function getResponse(prompt) {
  const chat = await model.startChat({ history: history });
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  return text;
}

// user chat div
export const userDiv = (data) => {
  return `
  <!-- User Chat -->
          <div class="flex items-center gap-2 justify-start">
            <img
              src="user.jpg"
              alt="user icon"
              class="w-10 h-10 rounded-full"
            />
            <p class="bg-gemDeep text-white p-1 rounded-md shadow-md px-2 ">
              ${data}
            </p>
          </div>
  `;
};

// AI Chat div
export const aiDiv = (data) => {
  return `
  <!-- AI Chat -->
          <div class="flex gap-2 justify-end" style="padding-left: 130px">
            <pre class="bg-gemRegular/40 text-gemDeep p-1 rounded-4 px-4 shadow-md whitespace-pre-wrap">
              ${data}
            </pre>
            <img
              src="chat-bot.jpg"
              alt="user icon"
              class="w-10 h-10 rounded-full"
            />
          </div>
  `;
};

const Chatbot = () => {
  let userMessage = useRef()
  let chatArea = useRef()
  let chatForm = useRef()

  async function handleSubmit(event) {
    event.preventDefault();

    var prompt = userMessage.current.value.trim();
    if (prompt === "") {
      return;
    }

    console.log("user message", prompt);

    chatArea.current.innerHTML += userDiv(prompt);
    userMessage.current.value = "";
    const aiResponse = await getResponse(prompt);
    let md_text = md().render(aiResponse);
    chatArea.current.innerHTML += aiDiv(md_text);

    let newUserRole = {
      role: "user",
      parts: prompt,
    };
    let newAIRole = {
      role: "model",
      parts: aiResponse,
    };

    history.push(newUserRole);
    history.push(newAIRole);

    console.log(history);
  }

  function handleKeyup(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col p-6">
      <section>
        <div className="container mx-auto sm:px-4">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
            <h5 className="text-black text-lg font-medium mb-0 ps-4">
              OptiPick AI Chatbot
            </h5>
          </div>
          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 mt-4 shadow-md rounded-5">
            <div className="flex-auto p-6">
              <div className="flex flex-col">
                <div id="chat-container" ref={chatArea} class=""></div>
                <div className="w-full p-2 flex border-b rounded-full py-2 px-4 shadow-md">
                  <form onSubmit={handleSubmit} action="" method="post" className="w-full flex" id="chat-form" ref={chatForm} onKeyUp={handleKeyup}>
                    <input placeholder="Ask your question?" type="text" name="" ref={userMessage} id="prompt" class="w-full p-1 pb-0" />
                    <button className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white" type="submit">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >
    </div >
  )
}

export default Chatbot