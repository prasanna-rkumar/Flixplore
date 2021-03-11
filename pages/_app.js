import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return <div>
    <Header />
    <Component {...pageProps} />
  </div>
}

export default MyApp
