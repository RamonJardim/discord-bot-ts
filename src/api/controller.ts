import { Client } from 'discord.js'
import express from 'express'

export default class Controller {
  private client: Client
  private router: express.Router

  constructor(client: Client) {
    this.client = client
    this.router = express.Router()

    this.setupRoutes()
  }

  setupRoutes(): void {
    this.router.get('/ramon', (req, res, ) => {
      res.send('eae')
    })
  }

  getRouter(): express.Router {
    return this.router
  }
}
