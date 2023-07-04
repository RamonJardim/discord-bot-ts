import { Client, GuildMember, Message } from 'discord.js'

import BaseCommand from '../classes/base-command'
import GuildInfoRepository from '../repository/guild-info-repository'
import Constants from '../utils/constants'


export default class VaiPassear extends BaseCommand {
  static commandName = 'vaiPassear'
  static description = 'Impede/permite o infeliz de entrar em qualquer canal de voz.'
  static usage = 'vaiPassear + @user em modo toggle'
  static aliases = ['vp']

  constructor(client: Client) {
    super(client)
  }

  private hasProtection(member: GuildMember): boolean {
    let hasProtection = false

    member.roles.cache.forEach(role => {
      if (role.name.toLowerCase().includes(Constants.protectedRoleName)) hasProtection = true
    })

    return hasProtection
  }

  private async setStrolling(member: GuildMember, strolling: boolean): Promise<void> {
    const guildInfo = await GuildInfoRepository.getGuildInfo(member.guild.id, member.guild.name)

    await GuildInfoRepository.updateStrollingMembers(guildInfo.guildId || '', { ...(guildInfo.strollingMembers), [member.id]: strolling })

    if (strolling) member.voice.disconnect()
  }


  async implementation(args: string[], message: Message): Promise<void> {
    const guildInfo = await GuildInfoRepository.getGuildInfo(message.guild?.id ?? '', message.guild?.name ?? '')

    if (message.mentions.everyone) {
      message.reply('Não vou deixar você fazer isso.')

      return
    }

    const mentionedUser = message.mentions.users.first()
    const victim = message.guild?.members.cache.get(mentionedUser?.id ?? '')
    const author = message.guild?.members.cache.get(message.author.id)

    if(!victim) throw new Error('Victim not found')
    if(!author) throw new Error('Author not found')

    const victimHasProtection = this.hasProtection(victim)
    const authorHasProtection = this.hasProtection(author)

    if (guildInfo.strollingMembers[victim.id]) {
      await this.setStrolling(victim, false)
      message.reply('Volta aqui, seu infeliz.')

      return
    }

    if (victimHasProtection) {
      if (authorHasProtection) {
        if (author.voice.channel && victim.voice.channel) {
          await this.setStrolling(author, true)
          await this.setStrolling(victim, true)
          message.reply('Vai todo mundo passear, seus infelizes.')
        }
      }
      else {
        if (author.voice.channel) {
          await this.setStrolling(author, true)
          message.reply('Vai passear, seu infeliz.')
        }
      }
    }
    else {
      if (victim.voice.channel) {
        this.setStrolling(victim, true)
        message.reply('Vai passear, seu infeliz.')
      }
    }
  }
}
