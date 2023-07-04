import { Client, ClientOptions } from 'discord.js'

import BaseCommand from './base-command'

export default class ExpandedClient extends Client {
  constructor(options: ClientOptions, prefix: string) {
    super(options)
    this.prefix = prefix
  }

  commands: Map<string, BaseCommand> = new Map<string, BaseCommand>()
  prefix: string
}
