import Image from 'next/image'

function isEquipoStats(equipo: TeamData | EquipoStats): equipo is EquipoStats {
  return (equipo as EquipoStats).nombre !== undefined
}

type Column = {
  header: string
  accessor: string
  isBold?: boolean
}

type TeamData = {
  icon?: { file?: { url: string } }
  properties: {
    Nombre?: { title: { plain_text: string }[] }
    [key: string]: any
  }
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

type TableProps = {
  title: string
  columns: Column[]
  data: Array<TeamData | EquipoStats>
}

const Table: React.FC<TableProps> = ({ title, columns, data }) => (
  <div className="tableContainer">
    <h2>{title}</h2>
    <table
      cellPadding="10"
      cellSpacing="0"
      style={{ width: '100%', textAlign: 'center' }}
      className="tablaPosiciones"
    >
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((equipo, rowIndex) => {
          const isStats = isEquipoStats(equipo)
          const nombre = isStats
            ? equipo.nombre
            : equipo.properties.Nombre?.title[0]?.plain_text || 'Sin Nombre'
          const icon = isStats ? equipo.icon : equipo.icon?.file?.url || ''
          const stats = isStats ? equipo : equipo.properties

          return (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {icon && (
                    <div style={{ minWidth: '24px', flexShrink: 0 }}>
                      <Image
                        src={icon}
                        height={24}
                        width={24}
                        objectFit="contain"
                        alt="Icono"
                      />
                    </div>
                  )}
                  <span
                    style={{
                      marginLeft: '8px',
                      whiteSpace: 'nowrap',
                      fontWeight: 300,
                    }}
                  >
                    {nombre}
                  </span>
                </div>
              </td>
              {columns.slice(2).map((col, colIndex) => {
                // Verifica si la propiedad es un objeto y extrae el valor correcto
                let value = stats[col.accessor]

                // Si el valor es un objeto con una propiedad 'formula', accedemos a 'formula.number'
                if (value && typeof value === 'object' && value.formula) {
                  value = value.formula.number
                }

                // Si el valor sigue siendo un objeto o es undefined, ponemos un valor por defecto (0)
                value = value ?? 0
                return (
                  <td
                    key={colIndex}
                    style={{ fontWeight: col.isBold ? 'bold' : 'normal' }}
                  >
                    {value}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default Table
