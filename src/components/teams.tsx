import Rise from '../../public/teams/Rise/escudo.png'
import SanFelipe from '../../public/teams/San Felipe/escudo.png'
import SanVelicina from '../../public/teams/San Velicina/escudo.png'
import Masantonio from '../../public/teams/Masantonio/escudo.png'
import Bochini from '../../public/teams/Bochini/escudo.png'
import Titanes from '../../public/teams/Titanes/escudo.png'
import Virrey from '../../public/teams/Virrey/escudo.png'
import Texas from '../../public/teams/Texas/escudo.png'
import Image from 'next/image'

const features = [
  {
    text: 'Rise FC',
    icon: Rise,
  },
  {
    text: 'San Felipe FC',
    icon: SanFelipe,
  },
  {
    text: 'San Velicina FC',
    icon: SanVelicina,
  },
  {
    text: 'CA Bochini',
    icon: Bochini,
  },
  {
    text: 'Masantonio',
    icon: Masantonio,
  },
  {
    text: 'CA Virrey',
    icon: Virrey,
  },
  {
    text: 'Titanes FC',
    icon: Titanes,
  },
  {
    text: 'Texas FC',
    icon: Texas,
  },
]

const Teams = ({ full }) => (
  <div className={`features ${full ? 'full' : ''}`}>
    {features.map(({ text, icon: Icon }) => (
      <div className={`feature ${full ? '' : ''}`} key={text}>
        {Icon && <Image height={24} width={24} src={Icon} />}
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)

export default Teams
