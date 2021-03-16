import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import PropTypes from 'prop-types';
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
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};

export default MyApp;
