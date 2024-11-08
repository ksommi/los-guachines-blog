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
import Table from '../../components/tables'
import Fixture from '../../components/fixture'

interface PageProps {
  tournament: any // tipo de torneo específico si tienes
  teams: Equipo[]
  fixture: Partido[]
}

type EquipoStats = {
  icon: string
  nombre: string
  puntos: number
  partidosJugados: number
  ganados: number
  empatados: number
  perdidos: number
  golesFavor: number
  golesContra: number
  diferenciaGoles: number
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
    revalidate: 30,
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

const RenderTeam = ({ teams, tournament, fixture }) => {
  const stats: Record<string, EquipoStats> = (teams || []).reduce(
    (acc, team) => {
      acc[team.id] = {
        icon: team.icon?.file?.url || '',
        nombre: team.properties.Nombre.title[0]?.plain_text || '',
        puntos: 0,
        partidosJugados: 0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        golesFavor: 0,
        golesContra: 0,
        diferenciaGoles: 0,
      }
      return acc
    },
    {}
  )

  const partidosLiga = (fixture || []).filter(
    (partido) => partido.properties.Liga?.checkbox === true
  )

  const partidosEliminatoria = (fixture || []).filter(
    (partido) => partido.properties.Liga?.checkbox === false
  )

  partidosLiga.forEach((partido) => {
    const golesLocal = partido.properties['Goles local']?.number || 0
    const golesVisitante = partido.properties['Goles visitante']?.number || 0
    const ganadorId = partido.properties.Ganador?.relation[0]?.id
    const perdedorId = partido.properties.Perdedor?.relation[0]?.id
    const empateLocalId = partido.properties['Empate Local']?.relation[0]?.id
    const empateVisitanteId =
      partido.properties['Empate Visitante']?.relation[0]?.id
    const localId = partido.properties.Local.relation[0]?.id
    const visitanteId = partido.properties.Visitante.relation[0]?.id

    // Actualiza goles a favor y en contra para ambos equipos
    if (localId && visitanteId) {
      stats[localId].golesFavor += golesLocal
      stats[localId].golesContra += golesVisitante
      stats[visitanteId].golesFavor += golesVisitante
      stats[visitanteId].golesContra += golesLocal
    }

    if (ganadorId) {
      stats[ganadorId].partidosJugados += 1
      stats[ganadorId].ganados += 1
      stats[ganadorId].puntos += 3
    }

    if (perdedorId) {
      stats[perdedorId].partidosJugados += 1
      stats[perdedorId].perdidos += 1
    }

    if (empateLocalId && empateVisitanteId) {
      stats[empateLocalId].partidosJugados += 1
      stats[empateVisitanteId].partidosJugados += 1
      stats[empateLocalId].empatados += 1
      stats[empateVisitanteId].empatados += 1
      stats[empateLocalId].puntos += 1
      stats[empateVisitanteId].puntos += 1
    }
  })

  // Calcula la diferencia de goles
  Object.keys(stats).forEach((teamId) => {
    stats[teamId].diferenciaGoles =
      stats[teamId].golesFavor - stats[teamId].golesContra
  })

  const tablaOrdenada: EquipoStats[] = Object.values(stats)
    .filter((equipo) => equipo.partidosJugados > 0)
    .sort((a, b) => {
      if (b.puntos !== a.puntos) return b.puntos - a.puntos
      if (b.diferenciaGoles !== a.diferenciaGoles)
        return b.diferenciaGoles - a.diferenciaGoles
      return b.golesFavor - a.golesFavor
    })

  const columns = [
    { header: '#', accessor: 'posicion' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Pts', accessor: 'puntos' },
    { header: 'PJ', accessor: 'partidosJugados' },
    { header: 'PG', accessor: 'ganados' },
    { header: 'PE', accessor: 'empatados' },
    { header: 'PP', accessor: 'perdidos' },
    { header: 'GF', accessor: 'golesFavor' },
    { header: 'GC', accessor: 'golesContra' },
    { header: 'DG', accessor: 'diferenciaGoles' },
  ]

  const equipoCampeon = tournament
    ? teams.find(
        (equipo) =>
          equipo.id === tournament.properties?.Campeón?.relation[0]?.id
      )
    : null

  const partidosPorFechaLiga: Record<string, Partido[]> = partidosLiga.reduce(
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

  const partidosPorFechaEliminatoria: Record<
    string,
    Partido[]
  > = partidosEliminatoria.reduce((acc, partido) => {
    const fecha = partido.properties.Fecha?.select?.name || 'Fecha desconocida'
    if (!acc[fecha]) {
      acc[fecha] = []
    }
    acc[fecha].push(partido)
    return acc
  }, {})

  return (
    <div>
      <Header />
      <div className={sharedStyles.layout}>
        <h1>
          🏆{' '}
          {tournament?.properties?.Nombre.title[0].plain_text || 'Cargando...'}
        </h1>

        {equipoCampeon && <ChampionCard equipo={equipoCampeon} />}

        <div className="fixture-container">
          {fixture && (
            <Fixture
              partidosPorFecha={partidosPorFechaEliminatoria}
              teams={teams}
            />
          )}
          {teams && (
            <Table
              title="Fase de grupos"
              columns={columns}
              data={tablaOrdenada}
            />
          )}
          {fixture && (
            <Fixture partidosPorFecha={partidosPorFechaLiga} teams={teams} />
          )}
        </div>
      </div>
    </div>
  )
}

export default RenderTeam
