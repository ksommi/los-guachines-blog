import { API_TOKEN, PLAYERS_INDEX_ID } from './actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getPlayersTournament(tournamentId: string) {
  const databaseId = PLAYERS_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: 'Equipo Ideal',
            relation: {
              contains: tournamentId,
            },
          },
          {
            property: 'Goleador del torneo',
            relation: {
              contains: tournamentId,
            },
          },
          {
            property: 'Maximo asistidor',
            relation: {
              contains: tournamentId,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Posicion',
          direction: 'ascending',
        },
      ],
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
