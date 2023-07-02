import { Client, ClientOptions } from "discord.js";
import BaseCommand from "./BaseCommand";

export default class ExpandedClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }

    public commands: Map<string, BaseCommand> = new Map<string, BaseCommand>();
    public prefix: string = ';';
}