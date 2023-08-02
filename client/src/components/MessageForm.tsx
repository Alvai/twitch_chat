import { FormEventHandler, useState } from "react";
import { Button } from "./Button";

const MessageForm = ({ onSubmit }: { onSubmit: (message: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center p-2 w-full"
    >
      <div className="flex-1">
        <label htmlFor="message" className="sr-only">
          Email
        </label>
        <div>
          <input
            type="text"
            name="message"
            value={message}
            required
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            id="message"
            className="shadow-sm h-10 focus:ring-indigo-500 border py-2 px-3 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="hello"
            aria-describedby="message"
          />
        </div>
      </div>
      <Button type="submit" disabled={message.length === 0}>
        Send
      </Button>
    </form>
  );
};

export { MessageForm };
