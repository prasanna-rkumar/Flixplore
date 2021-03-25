import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import PropTypes from 'prop-types';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </AuthProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.instanceOf(Object).isRequired,
};

export default MyApp;
