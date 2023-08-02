import { MessageForm } from "../components/MessageForm";
import { useUser } from "../hooks/useUser";
import { useWebsocket } from "../hooks/useWebsocket";
import { MessageFeed } from "../components/MessageFeed";
import { useState } from "react";

const LiveChat = () => {
  const [channel, setChannel] = useState("general");
  // TODO: move URL to .env
  const { sendMessage, messages } = useWebsocket(
    `ws://localhost:3000?channel=${channel}`
  );
  // TODO: is there a better way to get the username?
  const { data } = useUser();

  const handleSendMessage = (message: string) => {
    sendMessage(JSON.stringify({ message, username: data ?? "anonymous" }));
  };

  return (
    <div className="border w-1/2 flex flex-col items-center">
      <p className="text-base">Live Chat</p>
      <span className="relative z-0 inline-flex shadow-sm rounded-md py-2">
        <button
          type="button"
          className={`${
            channel === "general" &&
            "!bg-indigo-500 text-white !border-indigo-500 focus:!ring-0"
          } relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
          onClick={() => {
            setChannel("general");
          }}
        >
          general
        </button>
        <button
          type="button"
          className={`${
            channel === "spam" &&
            "!bg-indigo-500 text-white !border-indigo-500 focus:!ring-0"
          } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
          onClick={() => {
            setChannel("spam");
          }}
        >
          spam
        </button>
        <button
          type="button"
          className={`${
            channel === "meme-revue" &&
            "!bg-indigo-500 text-white !border-indigo-500 focus:!ring-0"
          } -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
          onClick={() => {
            setChannel("meme-revue");
          }}
        >
          meme-revue
        </button>
      </span>
      <div className="w-full border-t border-gray-300"></div>
      <MessageFeed messages={messages} />
      <div className="w-full border-t border-gray-300"></div>
      <MessageForm onSubmit={handleSendMessage} />
    </div>
  );
};

export { LiveChat };
