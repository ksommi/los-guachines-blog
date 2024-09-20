import { API_ENDPOINT, API_TOKEN, TEAM_INDEX_ID } from '../notion2/actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getAllTeams() {
  const databaseId = TEAM_INDEX_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'In stock',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'Cost of next trip',
          number: {
            greater_than_or_equal_to: 2,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Last ordered',
        direction: 'ascending',
      },
    ],
  })
  console.log(response)
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
