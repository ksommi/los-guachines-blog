import { API_ENDPOINT, API_TOKEN, TEAM_INDEX_ID } from '../notion2/actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getOneTeam(slug: string) {
  const databaseId = TEAM_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'slug',
        rich_text: {
          equals: slug,
        },
      },
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
