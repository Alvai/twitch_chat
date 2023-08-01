import { FormEventHandler, useState } from "react";

const MessageForm = ({ onSubmit }: { onSubmit: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit" disabled={message.length === 0}>
        Send
      </button>
    </form>
  );
};

export { MessageForm };
