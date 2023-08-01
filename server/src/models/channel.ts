import { getDBconn } from "../db/db";

/**
 * Saves a message to a specific channel
 * message is pushed to the end of the messages array
 *
 * @param channelName
 * @param message
 */
export const saveMessageToChannel = async (
  channelName: string,
  message: { username: string; message: string }
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
    { name: "main" },
    {
      $push: { messages: message },
    }
  );
};

/**
 * Loads the last 20 messages from a specific channel
 *
 * @param channelName
 * @returns array of messages
 */
export const loadPreviousMessages = async (channelName: string) => {
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
