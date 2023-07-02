import { Client, Message } from "discord.js";
import BaseCommand from "../classes/BaseCommand";
import Constants from "../utils/constants";

export default class VaiPassear extends BaseCommand {
    public static commandName: string = 'vaiPassear';
    public description: string = 'Impede/permite o infeliz de entrar em qualquer canal de voz.';
    public usage: string = 'vaiPassear + @user em modo toggle';

    constructor(client: Client) {
        super(client);
    }

    public async implementation(args: string[], message: Message): Promise<void> {
        if (message.mentions.everyone) {
            message.reply('Não vou deixar você fazer isso.');
            return;
        }

        const user = message.mentions.users.first();
        const member = message.guild?.members.cache.get(user?.id as string);

        if (Constants.strollingMembers[member.id]) {
            Constants.strollingMembers[member.id] = false;
            message.reply('Volta aqui, seu infeliz.');
            return;
        }
        else {
            if (member?.voice.channel) {
                // member.voice.disconnect();
                message.reply('Vai passear, seu infeliz.');
                Constants.strollingMembers[member.id] = true;
            }
            else {
                message.reply('Esse infeliz não está em nenhum canal de voz.');
            }
        }

        return;
    }
}