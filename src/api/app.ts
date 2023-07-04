import { Client } from 'discord.js'
import express from 'express'

import Controller from '../api/controller'

export default class ExpressApp {
  static setup(client: Client): void {
    const app = express()
    const controller = new Controller(client)

    app.use('/api', controller.getRouter())

    app.listen(process.env.PORT || 3000, () => {
      console.log(`App listening on port ${ process.env.PORT || 3000 }`)
    })
  }
}
