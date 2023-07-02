import { Client, Message } from "discord.js";
import BaseCommand from "../classes/BaseCommand";
import doge from 'dogeify-js';

export default class Doge extends BaseCommand {
    public static commandName: string = 'doge';
    public description: string = 'such doge';
    public usage: string = 'doge';

    constructor(client: Client) {
        super(client);
    }

    public async implementation(args: string[], message: Message): Promise<void> {
        message.channel.send(await doge(args))
    }
}