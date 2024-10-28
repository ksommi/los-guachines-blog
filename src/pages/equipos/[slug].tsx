import React from 'react'
import Header from '../../components/header'
import getOneTeam from '../../lib/notion2/getOneTeam'
import getAllTeams from '../../lib/notion2/getAllTeams'
import { getBlogLink } from '../../lib/blog-helpers'
import sharedStyles from '../../styles/shared.module.css'
import teamStyles from '../../styles/team.module.css'
import Image from 'next/image'
import getPlayersClub from '../../lib/notion2/getPlayersClub'
import defaultProfile from '../../../public/generic-icon.png'
import Loading from '../../components/loading'
import getFixtureClub from '../../lib/notion2/getFixtureClub'

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  var equipos = await getOneTeam(slug)
  var team = equipos.results[0]
  var jugadores = await getPlayersClub(team.id)
  var players = jugadores.results
  /* var partidos = await getFixtureClub(team.id)
  var fixture = partidos.results */
  return { props: { team, players } }
}

export async function getStaticPaths() {
  const allTeams = await getAllTeams()
  const teams = allTeams.results
  return {
    paths: teams.map((team, index) => {
      const slug = team?.properties.slug?.rich_text[0]?.plain_text
      console.log(slug)

      return `/equipos/${slug}`
    }),
    fallback: true,
  }
}

const RenderTeam = ({ team, players }) => {
  if (!team) {
    return <Loading />
  }
  //console.log(team)
  //console.log(players)

  const icono = team?.icon.file?.url || ''
  const nombre = team?.properties.Nombre.title[0]?.plain_text || ''
  const presidente = team?.properties.Presidente.rich_text[0]?.plain_text || ''
  const historia = team?.properties.Historia.rich_text[0]?.plain_text || ''
  const ubicacion = team?.properties.Ubicacion?.rich_text[0]?.plain_text || ''
  const fundacion = team?.properties.Fundacion.date.start || ''
  const estadio =
    team?.properties['Estadio Local'].rich_text[0]?.plain_text || ''
  const jugados = team?.properties.Jugados.formula.number || 0
  const gfTotal = team?.properties['GF Total'].formula.number || 0
  const gcTotal = team?.properties['GC Total'].formula.number || 0
  const ptsTotal = team?.properties['Pts Total'].formula.number || 0
  const ganado = team?.properties.Ganado.formula.number || 0
  const perdido = team?.properties.Perdido.formula.number || 0
  const empatado = team?.properties.Empatado.formula.number || 0
  const diferenciaGoles = team?.properties['GD Total'].formula.number || 0

  const formattedFundacion = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${fundacion}T00:00:00`))

  return (
    <div>
      <Header
        titlePre={team?.properties.Nombre.title[0]?.plain_text || 'Cargando..'}
      />
      <div className={sharedStyles.layout}>
        {team && (
          <>
            <div></div>
            <div className={teamStyles.info}>
              <div className={teamStyles.header}>
                <Image
                  src={icono}
                  alt="Escudo del Club"
                  className={teamStyles.escudo}
                  width={64}
                  height={64}
                />
                <h1 className={teamStyles.nombre}>{nombre}</h1>
              </div>
              <ul className={teamStyles.details}>
                <li>
                  <strong>Presidente:</strong> {presidente}
                </li>
                <li>
                  <strong>Fundación:</strong> {formattedFundacion}
                </li>
                <li>
                  <strong>Estadio Local:</strong> {estadio}
                </li>
                <li>
                  <strong>Ubicación:</strong> {ubicacion}
                </li>
              </ul>
            </div>

            <div className={teamStyles.historia}>
              <h2>Historia del Club</h2>
              <p>{historia}</p>
            </div>

            {players && (
              <div className={teamStyles.playersList}>
                <h2>Plantel</h2>
                {players.map((player, index) => {
                  const nombreJugador =
                    player.properties.Nombre.title[0]?.plain_text ||
                    'Sin Nombre'
                  const posicionJugador =
                    player.properties.Posicion.select?.name
                      .slice(0, 3)
                      .toUpperCase() || ''
                  const colorPosicionClass = `position-${
                    player.properties.Posicion.select?.color || 'green'
                  }`
                  const nacionalidadJugador =
                    player.properties.Nacionalidad.select?.name || ''
                  const iconoJugador = player.icon?.file?.url || defaultProfile
                  return (
                    <div key={index} className={teamStyles.cardPlayer}>
                      <div className={teamStyles.iconPlayer}>
                        <Image
                          src={iconoJugador}
                          alt={`Icono de ${nombreJugador}`}
                          width={64}
                          height={64}
                          className={teamStyles.profilePlayer}
                        />
                      </div>
                      <div className={teamStyles.infoPlayer}>
                        <span className={teamStyles.namePlayer}>
                          {nombreJugador}
                        </span>
                        <span className={teamStyles.nationalityPlayer}>
                          {nacionalidadJugador}
                        </span>
                      </div>
                      <div
                        className={
                          teamStyles.positionPlayer +
                          ' ' +
                          teamStyles[colorPosicionClass]
                        }
                      >
                        {posicionJugador}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default RenderTeam
