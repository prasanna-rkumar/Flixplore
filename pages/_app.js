import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import Header from '../components/Header'
import { QueryClient, QueryClientProvider } from 'react-query'

let queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return <>
    <Header />
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
}

export default MyApp
