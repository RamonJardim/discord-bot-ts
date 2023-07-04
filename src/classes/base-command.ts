import { Client, Message } from 'discord.js'

export default abstract class BaseCommand {
  protected client: Client
  static readonly commandName: string
  static readonly description: string
  static readonly usage: string
  static readonly aliases: string[]
  abstract implementation(args: string[], message: Message): Promise<void>

  protected constructor(client: Client) {
    this.client = client
  }
}
