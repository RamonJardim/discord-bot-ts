import MongoDBClient from '../configuration/mongo-db-client'
import GuildInfo from '../models/guild-info'

export default class GuildInfoRepository {
  private static mongoCollection = new MongoDBClient().getMongoCollection()

  static async getGuildInfo(guildId: string, guildName: string): Promise<GuildInfo> {
    let guildInfo = (await this.mongoCollection.findOne({ guildId })) as unknown as GuildInfo | undefined

    if (!guildInfo) {
      const insertedGuild = await this.mongoCollection.insertOne({ guildId, guildName, strollingMembers: {} })
      guildInfo = new GuildInfo(guildId, guildName, new Map(), insertedGuild.insertedId)
    }

    return guildInfo
  }

  static async updateStrollingMembers(guildId: string, strollingMembers: Map<string, boolean>): Promise<void> {
    await this.mongoCollection.updateOne({ guildId }, { $set: { strollingMembers } })
  }
}
