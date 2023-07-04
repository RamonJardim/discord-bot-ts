import { Client, Message } from 'discord.js'
import doge from 'dogeify-js'

import BaseCommand from '../classes/base-command'

export default class Doge extends BaseCommand {
  static commandName = 'doge'
  static description = 'such doge'
  static usage = 'doge'
  static aliases = []

  constructor(client: Client) {
    super(client)
  }

  async implementation(args: string[], message: Message): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    message.channel.send(await doge(args.join(' ')) as string)
  }
}
