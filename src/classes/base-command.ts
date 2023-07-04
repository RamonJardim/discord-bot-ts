import { Client, Message } from 'discord.js'

export default abstract class BaseCommand {
  protected client: Client
  static readonly commandName: string
  abstract readonly description: string;
  abstract readonly usage: string;
  abstract implementation(args: string[], message: Message): Promise<void>;

  protected constructor(client: Client) {
    this.client = client
  }
}
