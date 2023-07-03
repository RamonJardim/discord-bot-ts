import dotenv from 'dotenv';
import SetupClient from './configuration/setup-client';

dotenv.config();

const token = process.env.DISCORD_BOT_SECRET;
const botPrefix = process.env.DISCORD_BOT_PREFIX;

console.log('Bot is starting...', '\n');

SetupClient.setup(token, botPrefix);
