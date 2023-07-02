import { ActivityType, Events, GatewayIntentBits } from "discord.js";
import ExpandedClient from "../classes/ExpandedClient";
import * as commands from '../commands'

export default class SetupClient {
  public static setup(token: string, botPrefix: string): ExpandedClient {
    const client = new ExpandedClient({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
      ]
    }, botPrefix);

    Object.keys(commands).forEach(commandKey => {
      const command = commands[commandKey]
      client.commands.set(command.commandName, new command(client));
    });

    setEvents(client);

    client.login(token);

    return client
  }
}

function setEvents(client: ExpandedClient) {
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
