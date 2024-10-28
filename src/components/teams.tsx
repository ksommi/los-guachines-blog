import Image from 'next/image'
import Link from 'next/link'
import defaultIcon from '../../public/generic-shield.png'

const Teams = ({ teams, full }) => (
  <div className={`teams ${full ? 'full' : ''}`}>
    {teams.map((equipo, index) => {
      const teamName = equipo.properties.Nombre.title[0].text.content // Ajusta según la estructura de tu API
      const icon = equipo.icon.file?.url || defaultIcon
      const slug = equipo.properties.slug.rich_text[0].text.content
      return (
        <Link href={`/equipos/${slug}`} key={teamName}>
          <a className={`team ${full ? 'full' : ''}`}>
            {icon && (
              <Image
                height={`${full ? '64' : '24'}`}
                width={`${full ? '64' : '24'}`}
                layout="intrinsic"
                objectFit="contain"
                src={icon}
              />
            )}

            {full ? <h3>{teamName}</h3> : <h4>{teamName}</h4>}
          </a>
        </Link>
      )
    })}
  </div>
)

export default Teams
