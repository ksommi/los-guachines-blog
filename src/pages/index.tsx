import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Teams from '../components/teams'
import sharedStyles from '../styles/shared.module.css'
import Image from 'next/image'

export default function Index() {
  return (
    <>
      <Header titlePre="Home" />
      <div className={sharedStyles.layout}>
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            aspectRatio: '1 / 1',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 auto',
          }}
        >
          <Image
            src="/poster.jpeg"
            layout="fill" // Para que la imagen llene el contenedor
            objectFit="cover" // Ajusta la imagen para que cubra todo el contenedor
            objectPosition="center" // Centra la imagen
            alt="Poster de la liga"
          />
        </div>
        <h1>Liga Los Guachines</h1>
        <h2>Enterate acá de todas las novedades</h2>

        {/* <Teams full={false} /> */}

        <div className="explanation">
          <p>
            Los Guachines son una historia que va más allá del fútbol.
            <br />
            Pasaron muchos campeonatos, muchas juntadas y muchas cargadas
            también, pero lo más importante siempre fueron los pibes.
            <br />
            Desde esos primeros torneos en 2012 hasta su renacimiento en 2024,
            la liga evolucionó, pero nunca perdió su esencia. Por lo que, hoy,
            Los Guachines estan más vivos que nunca.
          </p>
        </div>
      </div>
    </>
  )
}
