import Head from 'next/head';
import propTypes from 'prop-types';

const SEO = ({ title }) => (
  <Head>
    <title>
      Flixplore -
      {' '}
      {title}
    </title>
    <link rel="icon" href="/logo.png" />
  </Head>
);

SEO.propTypes = {
  title: propTypes.string,
};

SEO.defaultProps = {
  title: 'Explore Movies',
};

export default SEO;
