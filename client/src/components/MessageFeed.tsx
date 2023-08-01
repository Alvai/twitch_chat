import { useEffect, useRef } from "react";

/**
 * Displays a list of messages
 */
const MessageFeed = ({ messages }: { messages: Message[] }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the message container when a new message is received
  useEffect(() => {
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
    <div
      style={{ height: 500, overflowY: "auto", scrollBehavior: "smooth" }}
      ref={messageContainerRef}
    >
      {messages.length === 0 ? (
        <p>0 new messages</p>
      ) : (
        messages.map((message) => (
          <p key={message._id}>
            {message.username}: {message.message}
          </p>
        ))
      )}
    </div>
  );
};

export { MessageFeed };
