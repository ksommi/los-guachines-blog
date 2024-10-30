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
            width: '500px',
            height: '500px',
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
            Los Guachines nació en el año 2012, en los alrededores del Huergo,
            como un proyecto entre amigos que compartían una pasión: el fútbol y
            el PES. El nombre, que evoca la esencia de aquellos días, surgió de
            lo que éramos en ese momento, simplemente unos chicos disfrutando de
            su tiempo libre entre risas y partidos.
            <br />
            Durante sus primeros años, la liga fue un punto de encuentro para
            todos los que compartíamos esa misma pasión. La última edición se
            celebró en noviembre del 2016, dejando tras de sí recuerdos
            imborrables de amistades y competiciones intensas.
            <br />
            Después de un largo descanso de 8 años, en 2024, volvemos a revivir
            esa magia. La Liga Los Guachines regresa, renovada y con más fuerza
            que nunca, para reunir a viejos y nuevos amigos en un torneo que
            promete ser aún más emocionante.
          </p>
        </div>
      </div>
    </>
  )
}
