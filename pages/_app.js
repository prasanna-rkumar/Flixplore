import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import propTypes from 'prop-types';
import Header from '../components/Header';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: propTypes.element.isRequired,
  pageProps: propTypes.element.isRequired,
};

export default MyApp;
