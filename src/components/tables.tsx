import Image from 'next/image'

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

type TableProps = {
  title: string
  columns: Column[]
  data: TeamData[]
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
          const icon = equipo.icon.file?.url || ''
          const nombre =
            equipo.properties.Nombre?.title[0]?.plain_text || 'Sin Nombre'

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
                const value =
                  equipo.properties[col.accessor]?.formula?.number ??
                  equipo.properties[col.accessor] ??
                  0
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
