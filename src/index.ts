import dotenv from 'dotenv'

dotenv.config()

import ExpressApp from './api/app'
import SetupClient from './configuration/setup-client'

const token = process.env.DISCORD_BOT_SECRET ?? ''
const botPrefix = process.env.DISCORD_BOT_PREFIX ?? ''

console.log('Bot is starting...', '\n')

const client = SetupClient.setup(token, botPrefix)

ExpressApp.setup(client)
