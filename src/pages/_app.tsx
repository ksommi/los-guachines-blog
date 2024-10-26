import '../styles/global.css'
import 'katex/dist/katex.css'
import Footer from '../components/footer'
import Header from '../components/header'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
