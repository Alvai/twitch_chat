import { ObjectId } from "mongodb";
import { getDBconn } from "../db/db";

/**
 * Saves a message to a specific channel
 * message is pushed to the end of the messages array
 */
export const saveMessageToChannel = async (
  channelName: string,
  message: RawMessage
) => {
  const dbcon = await getDBconn();
  const channelsDB = dbcon.db("livechat");
  const channelCollection = channelsDB.collection("channels");

  const selectedChannel = await channelCollection.findOne({
    name: channelName,
  });

  if (!selectedChannel) {
    throw new Error("channel not found");
  }

  await channelCollection.updateOne(
    { name: channelName },
    {
      $push: { messages: { ...message, _id: new ObjectId() } },
    }
  );
};

/**
 * Loads the last 20 messages from a specific channel
 */
export const loadPreviousMessages = async (
  channelName: string
): Promise<Message> => {
  const dbcon = await getDBconn();
  const channelsDB = dbcon.db("livechat");

  const channelCollection = channelsDB.collection("channels");

  const selectedChannel = await channelCollection.findOne({
    name: channelName,
  });

  if (!selectedChannel) {
    throw new Error("channel not found");
  }

  return selectedChannel?.messages.slice(-20) || [];
};

/**
 * check if a channel exists, otherwise create it
 */
export const findOrCreateChannel = async (channelName: string) => {
  const dbcon = await getDBconn();
  const channelsDB = dbcon.db("livechat");

  const channelCollection = channelsDB.collection("channels");

  const selectedChannel = await channelCollection.findOne({
    name: channelName,
  });

  if (!selectedChannel) {
    await channelCollection.insertOne({
      name: channelName,
      messages: [],
    });
  }
};
