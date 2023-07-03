import { ActivityType, Events, GatewayIntentBits } from 'discord.js';
import ExpandedClient from '../classes/ExpandedClient';
import * as commands from '../commands';
import MongoDBClient from './MongoDBClient';
import { Collection } from 'mongodb';

export default class SetupClient {
  public static async setup(token: string, botPrefix: string): Promise<ExpandedClient> {
    const mongoClient = new MongoDBClient().getMongoCollection();

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
    }, botPrefix);

    // Todo: force types somehow
    Object.keys(commands).forEach(commandKey => {
      const command = commands[commandKey];
      client.commands.set(command.commandName, new command(client, mongoClient));
    });

    setEvents(client, mongoClient);

    client.login(token);

    return client;
  }
}

function setEvents(client: ExpandedClient, mongoClient: Collection) {
  client.on(Events.VoiceStateUpdate, async (oldMember, newMember) => {
    const guildInfo = await mongoClient.findOne({ guildId: newMember.guild.id });
    if (guildInfo.strollingMembers[newMember.id]) {
      newMember.setChannel(null);
    }
  });

  client.on(Events.ClientReady, () => {
    client.user.setActivity('LoL as Zoe', { type: ActivityType.Playing });
  
    console.log('Bot is ready!', '\n');
    console.log('Bot is in the following servers:');
    client.guilds.cache.forEach(guild => console.log(guild.name));
  });
  
  client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;
  
    const args = message.content.slice(client.prefix.length).split(/ +/);
    const command = args.shift();
    
    if (message.content.startsWith(client.prefix)) {
      await client.commands.get(command)?.implementation(args, message);
    }
  });
}
