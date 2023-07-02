import { Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import ExpandedClient from './classes/ExpandedClient';
import { Doge } from './commands';

dotenv.config();

const token = process.env.DISCORD_BOT_SECRET;
const botPrefix = process.env.DISCORD_BOT_PREFIX;

console.log('Bot is starting...', '\n');

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

client.commands.set(Doge.commandName, new Doge(client));

client.on(Events.ClientReady, () => {
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

client.login(token);