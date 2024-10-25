import { API_ENDPOINT, API_TOKEN, PLAYERS_INDEX_ID } from '../notion2/actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getPlayersClub(clubId: string) {
  const databaseId = PLAYERS_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Club',
        relation: {
          contains: clubId,
        },
      },
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
