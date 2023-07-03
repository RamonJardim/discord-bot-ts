import { Client, Message } from 'discord.js';
import { Collection } from 'mongodb';

export default abstract class BaseCommand {
  protected client: Client;
  public mongoCollection: Collection;
  public static readonly commandName: string;
  public abstract readonly description: string;
  public abstract readonly usage: string;
  public abstract implementation(args: string[], message: Message): Promise<void>;

  protected constructor(client: Client, mongoCollection: Collection) {
    this.client = client;
    this.mongoCollection = mongoCollection;
  }
}