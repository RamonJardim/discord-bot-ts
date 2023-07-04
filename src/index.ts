import dotenv from 'dotenv'

dotenv.config()

import SetupClient from './configuration/setup-client'

const token = process.env.DISCORD_BOT_SECRET ?? ''
const botPrefix = process.env.DISCORD_BOT_PREFIX ?? ''

console.log('Bot is starting...', '\n')

SetupClient.setup(token, botPrefix)
