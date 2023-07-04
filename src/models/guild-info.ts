import { ObjectId } from 'mongodb'

export default class GuildInfo {
  constructor(public guildId: string, public guildName: string, public strollingMembers: Map<string, boolean>, public id?: ObjectId) {}
}
