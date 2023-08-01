import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

// throw an error if the MONGODB_URI is not set
if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// conn is a global variable because we only want to create the connection once and then reuse it
// conn is initialized when the server starts
let conn: MongoClient;

/**
 * Returns the database connection. If the connection is not initialized, it will be initialized first.
 */
const getDBconn = async () => {
  if (!conn) {
    conn = await initDBcon();
  }

  return conn;
};

/**
 * initializes the database connection
 *
 * throws an error if the connection fails
 */
const initDBcon = async () => {
  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
    throw new Error("mongo connection failed");
  }

  return conn;
};

export { getDBconn, initDBcon };
