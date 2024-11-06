import { API_ENDPOINT, API_TOKEN, FIXTURE_INDEX_ID } from './actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getAllFixture() {
  const databaseId = FIXTURE_INDEX_ID
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    })
    return response
  } catch (error) {
    console.log('falló')
  }
}
