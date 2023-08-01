import { useLayoutEffect, useRef } from "react";
import { MessageForm } from "../components/MessageForm";
import { useUser } from "../hooks/useUser";
import { useWebsocket } from "../hooks/useWebsocket";

const LiveChat = () => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // TODO: move URL to .env
  const { sendMessage, messages } = useWebsocket("ws://localhost:3000");
  // TODO: is there a better way to get the username?
  const { data } = useUser();

  const handleSendMessage = (message: string) => {
    sendMessage(JSON.stringify({ message, username: data ?? "anonymous" }));
  };

  // Scroll to the bottom of the message container when a new message is received
  useLayoutEffect(() => {
    if (
      messageContainerRef.current &&
      messages.length > 0 &&
      messageContainerRef.current.scrollTop !==
        messageContainerRef.current.scrollHeight
    ) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ border: "1px solid black", width: "50%" }}>
      <p>Live Chat</p>
      <div style={{ height: 2, width: "100%", backgroundColor: "black" }}></div>
      <div
        style={{ height: 500, overflowY: "auto", scrollBehavior: "smooth" }}
        ref={messageContainerRef}
      >
        {messages.length === 0 ? (
          <p>0 new messages</p>
        ) : (
          messages.map((message, index) => (
            <p key={index}>
              {message.username}: {message.message}
            </p>
          ))
        )}
      </div>
      <MessageForm onSubmit={handleSendMessage} />
    </div>
  );
};

export { LiveChat };
