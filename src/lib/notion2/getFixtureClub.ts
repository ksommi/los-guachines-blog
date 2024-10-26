import { API_ENDPOINT, API_TOKEN, FIXTURE_INDEX_ID } from './actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getFixtureClub(clubId: string) {
  const databaseId = FIXTURE_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: 'Local',
            relation: {
              contains: clubId,
            },
          },
          {
            property: 'Visitante',
            relation: {
              contains: clubId,
            },
          },
        ],
      },
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
