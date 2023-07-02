import { Client, Message } from "discord.js";

export default abstract class BaseCommand {
    protected client: Client;
    public static readonly commandName: string;
    public abstract readonly description: string;
    public abstract readonly usage: string;
    public abstract implementation(args: string[], message: Message): Promise<void>;

    protected constructor(client: Client) {
        this.client = client;
    }
}