import { API_ENDPOINT, API_TOKEN } from './actions'
const { Client } = require('@notionhq/client')

const notion = new Client({ auth: API_TOKEN })

export default async function getOneTournament(id: string) {
  try {
    const response = await notion.pages.retrieve({ page_id: id })

    return response
  } catch (error) {
    console.log('falló')
  }
}
