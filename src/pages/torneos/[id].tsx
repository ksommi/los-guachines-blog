import React from 'react'
import Header from '../../components/header'
import getOneTeam from '../../lib/notion2/getOneTeam'
import sharedStyles from '../../styles/shared.module.css'
import teamStyles from '../../styles/team.module.css'
import Image from 'next/image'
import getPlayersClub from '../../lib/notion2/getPlayersClub'
import defaultProfile from '../../../public/generic-icon.png'

import getAllTournaments from '../../lib/notion2/getAllTournaments'
import getAllTeams from '../../lib/notion2/getAllTeams'
import getOneTournament from '../../lib/notion2/getOneTournament'
import getFixtureTournament from '../../lib/notion2/getFixtureTournament'
import ChampionCard from '../../components/champion'
import { GetStaticProps } from 'next'

interface PageProps {
  tournament: any // tipo de torneo específico si tienes
  teams: Equipo[]
  fixture: Partido[]
}

type Equipo = {
  id: string
  properties: {
    Nombre: { title: { plain_text: string }[] }
    icon: { file: { url: string } }
  }
}

type Partido = {
  properties: {
    Local: { relation: { id: string }[] }
    Visitante: { relation: { id: string }[] }
    Nombre: { title: { plain_text: string }[] }
    'Goles local': { number: number }
    'Goles visitante': { number: number }
    'Resumen Goles Local': { formula: { string: string } }
    'Resumen Goles Visitante': { formula: { string: string } }
    Fecha: { select: { name: string } }
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const torneoId = context.params?.id as string

  var equipos = await getAllTeams()
  var torneo = await getOneTournament(torneoId)
  var partidos = await getFixtureTournament(torneoId)

  return {
    props: {
      teams: equipos.results || [],
      tournament: torneo || null,
      fixture: partidos.results || [],
    },
    revalidate: 7200,
  }
}

export async function getStaticPaths() {
  var torneos = await getAllTournaments()
  return {
    paths: torneos.results.map((torneo, index) => {
      const id = torneo?.id
      console.log('id torneo: ' + id)

      return `/torneos/${id}`
    }),
    fallback: true,
  }
}

const formatText = (text) => {
  return text.replace(/,/g, ', ')
}

const RenderTeam = ({ teams, tournament, fixture }) => {
  //console.log(team)
  //console.log(players)

  /* const icono = team?.icon.file?.url || ''
  const nombre = team?.properties.Nombre.title[0]?.plain_text || ''
  const jugados = team?.properties.Jugados.formula.number || 0
  const gfTotal = team?.properties['GF Total'].formula.number || 0
  const gcTotal = team?.properties['GC Total'].formula.number || 0
  const ptsTotal = team?.properties['Pts Total'].formula.number || 0
  const ganado = team?.properties.Ganado.formula.number || 0
  const perdido = team?.properties.Perdido.formula.number || 0
  const empatado = team?.properties.Empatado.formula.number || 0
  const diferenciaGoles = team?.properties['GD Total'].formula.number || 0 */
  const equipoCampeon = tournament
    ? teams.find(
        (equipo) =>
          equipo.id === tournament.properties?.Campeón?.relation[0]?.id
      )
    : null

  // Agrupación de partidos por fecha
  const partidosPorFecha: Record<string, Partido[]> = (fixture || []).reduce(
    (acc, partido) => {
      const fecha =
        partido.properties.Fecha?.select?.name || 'Fecha desconocida'
      if (!acc[fecha]) {
        acc[fecha] = []
      }
      acc[fecha].push(partido)
      return acc
    },
    {}
  )

  return (
    <div>
      <Header />
      <div className={sharedStyles.layout}>
        <h1>
          🏆{' '}
          {tournament?.properties?.Nombre.title[0].plain_text || 'Cargando...'}
        </h1>
        {equipoCampeon && <ChampionCard equipo={equipoCampeon} />}
        {fixture && (
          <div className="fixture-table-styled">
            {Object.entries(partidosPorFecha).map(
              ([fecha, partidos], index) => (
                <div key={index} className="fecha-group">
                  {/* Título de la Fecha */}
                  <div className="fecha-titulo">{fecha}</div>

                  <table className="fixture-table">
                    <tbody>
                      {partidos.map((partido, index) => {
                        // Obtener IDs de equipos
                        const localId = partido.properties.Local.relation[0]?.id
                        const visitanteId =
                          partido.properties.Visitante.relation[0]?.id

                        // Buscar equipos en el array `equipos`
                        const equipoLocal = teams.find(
                          (equipo) => equipo.id === localId
                        )
                        const equipoVisitante = teams.find(
                          (equipo) => equipo.id === visitanteId
                        )

                        const resumenGolesLocal = partido.properties[
                          'Resumen Goles Local'
                        ].formula.string
                          ? formatText(
                              partido.properties['Resumen Goles Local'].formula
                                .string
                            )
                          : ''
                        const resumenGolesVisitante = partido.properties[
                          'Resumen Goles Visitante'
                        ].formula.string
                          ? formatText(
                              partido.properties['Resumen Goles Visitante']
                                .formula.string
                            )
                          : ''

                        return (
                          <React.Fragment key={index}>
                            <tr className="match-row">
                              <td className="fixture-icon-team">
                                <Image
                                  src={
                                    equipoLocal?.icon?.file?.url ||
                                    'default_local_icon.png'
                                  }
                                  width={30}
                                  height={30}
                                  alt="Local team logo"
                                />
                              </td>
                              <td className="fixture-t1">
                                <span className="datoequipo">
                                  {equipoLocal
                                    ? equipoLocal.properties.Nombre.title[0]
                                        ?.plain_text
                                    : 'Equipo desconocido'}
                                </span>
                              </td>
                              <td className="fixture-goles">
                                <div className="rojas1"></div>
                                <span>
                                  {partido.properties['Goles local'].number ??
                                    0}
                                </span>
                              </td>
                              <td className="fixture-goles">
                                <span>
                                  {partido.properties['Goles visitante']
                                    .number ?? 0}
                                </span>
                                <div className="rojas2"></div>
                              </td>
                              <td className="fixture-t2">
                                <span className="datoequipo">
                                  {equipoVisitante
                                    ? equipoVisitante.properties.Nombre.title[0]
                                        ?.plain_text
                                    : 'Equipo desconocido'}
                                </span>
                              </td>
                              <td className="fixture-icon-team">
                                <Image
                                  src={
                                    equipoVisitante?.icon?.file?.url ||
                                    'default_visitante_icon.png'
                                  }
                                  width={30}
                                  height={30}
                                  alt="Visitante team logo"
                                />
                              </td>
                            </tr>
                            <tr className="goles-row">
                              <td colSpan={3} className="goles-local">
                                <i>{resumenGolesLocal}</i>
                              </td>
                              <td colSpan={3} className="goles-visitante">
                                <i>{resumenGolesVisitante}</i>
                              </td>
                            </tr>
                          </React.Fragment>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RenderTeam
