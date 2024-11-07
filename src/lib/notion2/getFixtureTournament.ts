import { API_TOKEN, FIXTURE_INDEX_ID } from './actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getFixtureTournament(tournamentId: string) {
  const databaseId = FIXTURE_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'torneo',
        relation: {
          contains: tournamentId,
        },
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'descending',
        },
      ],
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
