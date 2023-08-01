/**
 * The message sent to the websocket server and stored in the DB
 */
interface Message {
  username: string;
  message: string;
  _id: string;
}

/**
 * The websocket server sends events of this type to the client
 */
type WebsocketEvent =
  | {
      eventType: "new_message";
      payload: Message;
    }
  | {
      eventType: "initial_message";
      payload: { messages: Message[] };
    };
