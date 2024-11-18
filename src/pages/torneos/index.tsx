import Header from '../../components/header'
import ExtLink from '../../components/ext-link'
import Teams from '../../components/teams'
import sharedStyles from '../../styles/shared.module.css'
import getAllTeams from '../../lib/notion2/getAllTeams'
import Image from 'next/image'

import defaultIcon from '../../../public/generic-shield.png'
import getAllTournaments from '../../lib/notion2/getAllTournaments'
import Table from '../../components/tables'
import Link from 'next/link'

export const getStaticProps = async () => {
  var equipos = await getAllTeams()
  var torneos = await getAllTournaments()

  return {
    props: { teams: equipos.results, tournaments: torneos.results },
    revalidate: 60,
  }
}

export default function Index({ teams = [], tournaments = [] }) {
  const teamsWithMatches = teams.filter(
    (team) => team.properties.Jugados.formula.number > 0
  )

  const teamsPromiedos = teamsWithMatches.sort(
    (a, b) =>
      b.properties.Promedios.formula.number -
      a.properties.Promedios.formula.number
  )

  const annualColumns = [
    { header: '#', accessor: 'index' },
    { header: 'Equipo', accessor: 'Nombre' },
    { header: 'Pts', accessor: 'Pts Total', isBold: true },
    { header: 'PJ', accessor: 'Jugados' },
    { header: 'PG', accessor: 'G Total' },
    { header: 'PE', accessor: 'E Total' },
    { header: 'PP', accessor: 'P Total' },
    { header: 'GF', accessor: 'GF Total' },
    { header: 'GC', accessor: 'GC Total' },
    { header: 'DG', accessor: 'GD Total' },
  ]

  const promedioColumns = [
    { header: '#', accessor: 'index' },
    { header: 'Equipo', accessor: 'Nombre' },
    { header: 'Pts', accessor: 'Pts Torneos Promedio' },
    { header: 'PJ', accessor: 'Jug Torneos Promedio' },
    { header: 'Prom', accessor: 'Promedios', isBold: true },
  ]

  return (
    <>
      <Header titlePre="Inicio" />
      <div className={sharedStyles.layout}>
        {teams && (
          <>
            <div className="tournament-container">
              {tournaments.map((torneo, index) => {
                const id = torneo.id
                return (
                  <Link href={`/torneos/${id}`} key={id}>
                    <a>
                      <div key={index} className="tournament-card">
                        <span className="tournament-icon">🏆</span>
                        <span className="tournament-name">
                          {torneo.properties?.Nombre.title[0]?.plain_text}
                        </span>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
            <Teams teams={teams} />
            <div className={sharedStyles.gridResponsive}>
              <Table
                title="Tabla Anual"
                columns={annualColumns}
                data={teamsWithMatches}
              />
              <Table
                title="Promedios"
                columns={promedioColumns}
                data={teamsPromiedos}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
