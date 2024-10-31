import Image from 'next/image'
import Link from 'next/link'
import defaultIcon from '../../public/generic-shield.png'

const Teams = ({ teams }) => (
  <div className="teams">
    {teams.map((equipo, index) => {
      const teamName = equipo.properties.Nombre.title[0].text.content // Ajusta según la estructura de tu API
      const icon = equipo.icon.file?.url || defaultIcon
      const slug = equipo.properties.slug.rich_text[0].text.content
      return (
        <Link href={`/equipos/${slug}`} key={teamName}>
          <a className={`team`}>
            {icon && (
              <Image
                height={64}
                width={64}
                layout="intrinsic"
                objectFit="contain"
                src={icon}
              />
            )}

            <h3>{teamName}</h3>
          </a>
        </Link>
      )
    })}
  </div>
)

export default Teams
