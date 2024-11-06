import Image from 'next/image'

type Equipo = {
  id: string
  icon: { file: { url: string } }
  properties: {
    Nombre: { title: { plain_text: string }[] }
  }
}

interface ChampionCardProps {
  equipo: Equipo
}

const ChampionCard: React.FC<ChampionCardProps> = ({ equipo }) => {
  if (!equipo) return <div>No se encontró el equipo campeón</div>

  return (
    <div className="campeon-card">
      <div className="campeon-header">
        <span className="campeon-titulo">Campeón</span>
      </div>
      <div className="campeon-content">
        <Image
          src={equipo.icon?.file.url}
          height={80}
          width={80}
          alt={`Escudo de ${equipo.properties.Nombre.title[0]?.plain_text}`}
          className="campeon-icon"
        />
        <h3 className="campeon-nombre">
          {equipo.properties.Nombre.title[0]?.plain_text}
        </h3>
      </div>
    </div>
  )
}

export default ChampionCard
