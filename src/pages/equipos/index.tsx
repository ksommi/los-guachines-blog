import Header from '../../components/header'
import ExtLink from '../../components/ext-link'
import Teams from '../../components/teams'
import sharedStyles from '../../styles/shared.module.css'
import getAllTeams from '../../lib/notion2/getAllTeams'
import Image from 'next/image'
import Loading from '../../components/loading'
import defaultIcon from '../../../public/generic-shield.png'

export const getStaticProps = async () => {
  var equipos = await getAllTeams()
  var teams = equipos.results

  return { props: { teams } }
}

export default function Index({ teams = [] }) {
  if (!teams.length) {
    return <Loading />
  }

  return (
    <>
      <Header titlePre="Inicio" />
      <div className={sharedStyles.layout}>
        {teams && (
          <>
            <Teams teams={teams} full={true} />
            <h2>Tabla anual</h2>
            <table
              cellPadding="10"
              cellSpacing="0"
              style={{ width: '100%', textAlign: 'center' }}
              className="tablaPosiciones"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Equipo</th>
                  <th>Pts</th>
                  <th>J</th>
                  <th>G</th>
                  <th>E</th>
                  <th>P</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>DG</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((equipo, index) => {
                  const icono = equipo.icon.file?.url || defaultIcon
                  const nombre =
                    equipo.properties.Nombre.title[0]?.plain_text ||
                    'Sin Nombre'
                  const jugados = equipo.properties.Jugados.formula.number || 0
                  const gfTotal =
                    equipo.properties['GF Total'].formula.number || 0
                  const gcTotal =
                    equipo.properties['GC Total'].formula.number || 0
                  const ptsTotal =
                    equipo.properties['Pts Total'].formula.number || 0
                  const ganado = equipo.properties.Ganado.formula.number || 0
                  const perdido = equipo.properties.Perdido.formula.number || 0
                  const empatado =
                    equipo.properties.Empatado.formula.number || 0
                  const diferenciaGoles =
                    equipo.properties['GD Total'].formula.number || 0

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {icono && (
                            <Image
                              src={icono}
                              height={24}
                              width={24}
                              layout="intrinsic"
                              objectFit="contain"
                            />
                          )}
                          <strong style={{ marginLeft: '8px' }}>
                            {nombre}
                          </strong>
                        </div>
                      </td>
                      <th>{ptsTotal}</th>
                      <td>{jugados}</td>
                      <td>{ganado}</td>
                      <td>{empatado}</td>
                      <td>{perdido}</td>
                      <td>{gfTotal}</td>
                      <td>{gcTotal}</td>
                      <td>{diferenciaGoles}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  )
}
