import { API_ENDPOINT, API_TOKEN, TEAM_INDEX_ID } from '../notion2/actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getAllTeams() {
  const databaseId = TEAM_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Pts Total',
          direction: 'descending',
        },
      ],
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
/* async function getAllTeams() {
    
  try {
    const data = await fetch(
      `${API_ENDPOINT}/databases/${TEAM_INDEX_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `bearer ${API_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(data)
  } catch (error) {
    console.log('FALLO')
  }
}
 */
