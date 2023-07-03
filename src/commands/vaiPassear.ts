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

    private hasProtection(member: any): boolean {
        let hasProtection = false;

        member.roles.cache.forEach(role => {
            if (role.name.toLowerCase().includes(Constants.protectedRoleName)) hasProtection = true
        })

        return hasProtection;
    }

    private setStrolling(member: any, strolling: boolean): void {
        Constants.strollingMembers[member.id] = strolling;
        if (strolling) member.voice.disconnect();
    }


    public async implementation(args: string[], message: Message): Promise<void> {
        if (message.mentions.everyone) {
            message.reply('Não vou deixar você fazer isso!');
            return;
        }

        const mentionedUser = message.mentions.users.first();
        const victim = message.guild?.members.cache.get(mentionedUser?.id as string);
        const author = message.guild?.members.cache.get(message.author.id as string);

        let victimHasProtection = this.hasProtection(victim);
        let authorHasProtection = this.hasProtection(author);

        if (Constants.strollingMembers[victim.id]) {
            this.setStrolling(victim, false);
            message.reply('Volta aqui, seu infeliz.');
            return;
        }
        
        if (victimHasProtection) {
            if (authorHasProtection) {
                if (author?.voice.channel && victim?.voice.channel) {
                    message.reply('Vai todo mundo passear, seus infelizes!');
                    this.setStrolling(author, true);
                    this.setStrolling(victim, true);
                }
            }
            else {
                if (author?.voice.channel) {
                    this.setStrolling(author, true);
                    message.reply('Vai passear, seu infeliz.');
                }
            }
        }
        else {
            if (victim?.voice.channel) {
                this.setStrolling(victim, true);
                message.reply('Vai passear, seu infeliz.');
            }
        }

        return;
    }
}