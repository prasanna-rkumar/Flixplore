/* eslint-disable max-len */
import Header from '../components/Header';
import LeftPane from '../components/LeftPane';
import RightPane from '../components/RightPane';
import SEO from '../components/SEO';
import { AppProvider } from '../context/HomePageContext';

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <SEO />
        <main className="grid grid-flow-col grid-cols-6 gap-8 relative py-4 px-3 items-start max-w-screen-2xl m-auto xl:px-16 mt-2">
          <AppProvider>
            <LeftPane />
            <RightPane />
          </AppProvider>
        </main>
        <footer />
      </div>
    </>
  );
}
