import { Client, GuildMember, Message } from 'discord.js';
import BaseCommand from '../classes/base-command';
import Constants from '../utils/constants';
import { Collection } from 'mongodb';


export default class VaiPassear extends BaseCommand {
  public static commandName = 'vaiPassear';
  public description = 'Impede/permite o infeliz de entrar em qualquer canal de voz.';
  public usage = 'vaiPassear + @user em modo toggle';

  constructor(client: Client, mongoCollection: Collection) {
    super(client, mongoCollection);
  }

  private hasProtection(member: GuildMember): boolean {
    let hasProtection = false;

    member.roles.cache.forEach(role => {
      if (role.name.toLowerCase().includes(Constants.protectedRoleName)) hasProtection = true;
    });

    return hasProtection;
  }

  private async setStrolling(member: GuildMember, strolling: boolean): Promise<void> {
    const guildInfo = await this.mongoCollection.findOne({ guildId: member.guild.id });
    await this.mongoCollection.updateOne({ guildId: member.guild.id }, { $set: { strollingMembers: { ...guildInfo.strollingMembers, [member.id]: strolling } } });


    if (strolling) member.voice.disconnect();
  }


  public async implementation(args: string[], message: Message): Promise<void> {
    let guildInfo = await this.mongoCollection.findOne({ guildId: message.guild.id });
    if (!guildInfo) {
      await this.mongoCollection.insertOne({ guildId: message.guild.id, guildName: message.guild.name, strollingMembers: {} });
      guildInfo = await this.mongoCollection.findOne({ guildId: message.guild.id });
    }

    if (message.mentions.everyone) {
      message.reply('Não vou deixar você fazer isso.');
      return;
    }

    const mentionedUser = message.mentions.users.first();
    const victim = message.guild?.members.cache.get(mentionedUser?.id);
    const author = message.guild?.members.cache.get(message.author.id);

    const victimHasProtection = this.hasProtection(victim);
    const authorHasProtection = this.hasProtection(author);

    if (guildInfo.strollingMembers[victim.id]) {
      await this.setStrolling(victim, false);
      message.reply('Volta aqui, seu infeliz.');
      return;
    }

    if (victimHasProtection) {
      if (authorHasProtection) {
        if (author?.voice.channel && victim?.voice.channel) {
          await this.setStrolling(author, true);
          await this.setStrolling(victim, true);
          message.reply('Vai todo mundo passear, seus infelizes.');
        }
      }
      else {
        if (author?.voice.channel) {
          await this.setStrolling(author, true);
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
  }
}