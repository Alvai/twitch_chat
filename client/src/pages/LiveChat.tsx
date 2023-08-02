import { MessageForm } from "../components/MessageForm";
import { useUser } from "../hooks/useUser";
import { useWebsocket } from "../hooks/useWebsocket";
import { MessageFeed } from "../components/MessageFeed";
import { useState } from "react";

const LiveChat = () => {
  const [channel, setChannel] = useState("main");
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
    <div style={{ border: "1px solid black", width: "50%" }}>
      <p>Live Chat</p>
      <button
        onClick={() => {
          setChannel("main");
        }}
      >
        main
      </button>
      <button
        onClick={() => {
          setChannel("general");
        }}
      >
        general
      </button>
      <div style={{ height: 2, width: "100%", backgroundColor: "black" }}></div>
      <MessageFeed messages={messages} />
      <MessageForm onSubmit={handleSendMessage} />
    </div>
  );
};

export { LiveChat };
