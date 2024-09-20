import Header from '../../components/header'
import ExtLink from '../../components/ext-link'
import Teams from '../../components/teams'
import sharedStyles from '../../styles/shared.module.css'
import getAllTeams from '../../lib/notion2/getAllTeams'

export default function Index() {
  getAllTeams()

  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <Teams full={true} />
      </div>
    </>
  )
}
