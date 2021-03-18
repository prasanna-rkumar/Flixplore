/* eslint-disable max-len */
import Head from 'next/head';

import LeftPane from '../components/LeftPane';
import RightPane from '../components/RightPane';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flixplore - Explore Movies</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="grid grid-flow-col grid-cols-6 gap-8 relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
        <LeftPane />
        <RightPane />
      </main>
      <footer />
    </div>
  );
}
