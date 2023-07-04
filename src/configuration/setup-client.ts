import { ActivityType, Events, GatewayIntentBits } from 'discord.js'

import ExpandedClient from '../classes/expanded-client'
import { commands } from '../commands'
import GuildInfoRepository from '../repository/guild-info-repository'

export default class SetupClient {
  static setup(token: string, botPrefix: string): ExpandedClient {

    const client = new ExpandedClient({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
      ]
    }, botPrefix)
    
    commands.forEach(command => {
      client.commands.set(command.commandName, new command(client))
    })

    setEvents(client)

    client.login(token)

    return client
  }
}

function setEvents(client: ExpandedClient): void {
  client.on(Events.VoiceStateUpdate, async (oldMember, newMember) => {
    const guildInfo = await GuildInfoRepository.getGuildInfo(newMember.guild.id, newMember.guild.name)
    if (guildInfo.strollingMembers[newMember.id]) {
      newMember.setChannel(null)
    }
  })

  client.on(Events.ClientReady, () => {
    client.user?.setActivity('LoL as Zoe', { type: ActivityType.Playing })
  
    console.log('Bot is ready!', '\n')
    console.log('Bot is in the following servers:')
    client.guilds.cache.forEach(guild => console.log(guild.name))
  })
  
  client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return
  
    const args = message.content.slice(client.prefix.length).split(/ +/)
    const command = args.shift()
    
    if (message.content.startsWith(client.prefix)) {
      const commandObject = client.commands.get(command ?? '')
      if(commandObject) await commandObject.implementation(args, message)
    }
  })
}
