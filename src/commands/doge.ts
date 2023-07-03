import { Client, Message } from 'discord.js';
import BaseCommand from '../classes/base-command';
import doge from 'dogeify-js';
import { Collection } from 'mongodb';

export default class Doge extends BaseCommand {
  public static commandName = 'doge';
  public description = 'such doge';
  public usage = 'doge';

  constructor(client: Client, mongoCollection: Collection) {
    super(client, mongoCollection);
  }

  public async implementation(args: string[], message: Message): Promise<void> {
    message.channel.send(await doge(args));
  }
}