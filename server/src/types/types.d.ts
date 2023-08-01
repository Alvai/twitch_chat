interface RawMessage {
  username: string;
  message: string;
}

interface Message extends RawMessage {
  _id: string;
}

interface Channel {
  _id: string;
  name: string;
  messages: Message[];
}
