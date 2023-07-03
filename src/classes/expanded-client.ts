import { Client, ClientOptions } from 'discord.js';
import BaseCommand from './base-command';

export default class ExpandedClient extends Client {
  constructor(options: ClientOptions, prefix: string) {
    super(options);
    this.prefix = prefix;
  }

  public commands: Map<string, BaseCommand> = new Map<string, BaseCommand>();
  public prefix: string;
}