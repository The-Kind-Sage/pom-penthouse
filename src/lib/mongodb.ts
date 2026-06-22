import { MongoClient, type Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "pompenthouse";

declare global {
  var _mongoClient: MongoClient | undefined;
  var _mongoDb: Db | undefined;
}

export async function getDb(): Promise<Db> {
  if (global._mongoDb) return global._mongoDb;
  const client = await getClient();
  global._mongoDb = client.db(DB_NAME);
  return global._mongoDb;
}

export async function getClient(): Promise<MongoClient> {
  if (global._mongoClient) {
    try {
      await global._mongoClient.db("admin").command({ ping: 1 });
      return global._mongoClient;
    } catch {
      global._mongoClient = null as any;
    }
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  global._mongoClient = client;
  return client;
}
