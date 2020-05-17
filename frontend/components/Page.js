import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import ReactGA from 'react-ga';

if (typeof window !== 'undefined') {
  ReactGA.initialize('UA-27102802-6');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function Page(props) {
  return (
    <div className='site-container'>
      <Head>
        <title>Distance Fest // May 16-17 : Live Music from Safe Spaces</title>
        <link rel='icon' type='icon' href='/favicon.png'></link>
        <meta
          property='og:title'
          content='Distance Fest // May 16-17 : Live Music from Safe Spaces'
        />
        <meta
          property='og:description'
          content='Live Streaming Music from Safe Spaces'
        />
        <meta property='og:image' content='/dfheader.png' />
      </Head>
      {/* <Header /> */}
      <div className='main'>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Page;
