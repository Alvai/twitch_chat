import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Takes a variables and checks if it is a WebsocketEvent
 **/
const isWebsocketEvent = (event: unknown): event is WebsocketEvent => {
  return (
    event !== null &&
    typeof event === "object" &&
    "eventType" in event &&
    "payload" in event
  );
};

/**
 * Custom hook to handle the websocket connection and send messages to the server
 * */
const useWebsocket = (websocketURL: string) => {
  // Stores the websocket connection
  const websocketRef = useRef<WebSocket | null>(null);
  // Stores the messages received from the websocket server
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * Sends a message to the websocket server if the connection is open
   */
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

    // when connected, set the websocketRef to the current websocket connection
    ws.onopen = function open() {
      websocketRef.current = ws;
    };

    // set the message handler
    ws.onmessage = messageHandler(setMessages);

    // reset the ref when the connection is closed
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

      // reset messages when the websocket is closed
      setMessages([]);
    };
  }, [websocketURL]);

  return { sendMessage, messages };
};

export { useWebsocket };

/**
 * Takes a function to update the messages and returns a function that handles the websocket messages
 */
const messageHandler =
  (updateMessages: React.Dispatch<React.SetStateAction<Message[]>>) =>
  ({ data }: MessageEvent) => {
    console.log(data);
    if (typeof data !== "string") {
      return;
    }
    const jsonPayload: unknown = JSON.parse(data);

    if (!isWebsocketEvent(jsonPayload)) return;

    if (jsonPayload.eventType === "initial_message") {
      updateMessages((currentMessages) => [
        ...currentMessages,
        ...jsonPayload.payload.messages,
      ]);
    }

    if (jsonPayload.eventType === "new_message") {
      updateMessages((currentMessages) => [
        ...currentMessages,
        jsonPayload.payload,
      ]);
    }
  };
