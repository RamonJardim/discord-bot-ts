import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

export default class MongoDBClient {
  private mongoCollection: Collection = undefined;

  public getMongoCollection(): Collection {
    if (this.mongoCollection) {
      return this.mongoCollection;
    }

    const client = new MongoClient(process.env.MONGO_CONN_STRING, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    client.connect();
    this.mongoCollection = client.db(process.env.MONGO_DB_NAME).collection(process.env.MONGO_DB_COLLECTION);

    return this.mongoCollection;
  }
}