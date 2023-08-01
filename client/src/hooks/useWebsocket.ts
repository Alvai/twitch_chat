import { useCallback, useEffect, useRef, useState } from "react";

const useWebsocket = (websocketURL: string) => {
  const websocketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<
    { message: string; username: string }[]
  >([]);

  const sendMessage = useCallback((payload: string) => {
    // check if there is a websocket connection and if it is open
    if (
      websocketRef.current !== null &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(payload);
    } else {
      // TODO: Display an error message to the user
      console.error("cannot send message right now");
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(websocketURL);

    ws.onopen = function open() {
      websocketRef.current = ws;
      console.log("connected");
    };

    ws.onmessage = function message({ data }) {
      console.log(data);
      if (typeof data !== "string") {
        return;
      }
      setMessages((currentMessages) => [
        ...currentMessages,
        JSON.parse(data) as { message: string; username: string },
      ]);
    };

    ws.onclose = function (event) {
      websocketRef.current = null;
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log(event.code);
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log(`[close] Connection died with code ${event.code}`);
      }
    };

    ws.onerror = function (error) {
      console.log(error);
    };

    return () => {
      // if websocket is open, close it
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }

      if (ws.readyState === WebSocket.CONNECTING) {
        console.log("Connection cancelled. ignore error in console");
        ws.close();
      }
    };
  }, [websocketURL]);

  return { sendMessage, messages };
};

export { useWebsocket };
