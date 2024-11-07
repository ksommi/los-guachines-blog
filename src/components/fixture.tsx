import React from 'react'
import Image from 'next/image'

type Partido = {
  properties: {
    Fecha: { select: { name: string } }
    Local: { relation: { id: string }[] }
    Visitante: { relation: { id: string }[] }
    'Resumen Goles Local': { formula: { string: string } }
    'Resumen Goles Visitante': { formula: { string: string } }
    'Goles local': { number: number }
    'Goles visitante': { number: number }
  }
}

type Equipo = {
  id: string
  properties: {
    Nombre: { title: [{ plain_text: string }] }
  }
  icon?: { file: { url: string } }
}

type FixtureProps = {
  partidosPorFecha: Record<string, Partido[]>
  teams: Equipo[]
}

const Fixture: React.FC<FixtureProps> = ({ partidosPorFecha, teams }) => {
  // Función para renderizar los partidos
  const renderPartidos = (partidos: Partido[]) => {
    return partidos.map((partido, index) => {
      const localId = partido.properties.Local.relation[0]?.id
      const visitanteId = partido.properties.Visitante.relation[0]?.id

      const equipoLocal = teams.find((equipo) => equipo.id === localId)
      const equipoVisitante = teams.find((equipo) => equipo.id === visitanteId)

      const resumenGolesLocal =
        partido.properties['Resumen Goles Local'].formula.string || ''
      const resumenGolesVisitante =
        partido.properties['Resumen Goles Visitante'].formula.string || ''

      return (
        <React.Fragment key={index}>
          <tr className="match-row">
            <td className="fixture-icon-team">
              <Image
                src={equipoLocal?.icon?.file?.url || 'default_local_icon.png'}
                width={30}
                height={30}
                alt="Local team logo"
              />
            </td>
            <td className="fixture-t1">
              <span className="datoequipo">
                {equipoLocal
                  ? equipoLocal.properties.Nombre.title[0]?.plain_text
                  : 'Equipo desconocido'}
              </span>
            </td>
            <td className="fixture-goles">
              <div className="rojas1"></div>
              <span>{partido.properties['Goles local'].number ?? 0}</span>
            </td>
            <td className="fixture-goles">
              <span>{partido.properties['Goles visitante'].number ?? 0}</span>
              <div className="rojas2"></div>
            </td>
            <td className="fixture-t2">
              <span className="datoequipo">
                {equipoVisitante
                  ? equipoVisitante.properties.Nombre.title[0]?.plain_text
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
    })
  }

  return (
    <div className="fixture-table-styled">
      {Object.entries(partidosPorFecha).map(([fecha, partidos]) => (
        <div key={fecha} className="fecha-group">
          <div className="fecha-titulo">{fecha}</div>
          <table className="fixture-table">
            <tbody>{renderPartidos(partidos)}</tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Fixture
