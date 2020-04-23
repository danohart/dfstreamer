import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

function Page(props) {
  return (
    <div className="site-container">
      <Head>
        <title>Distance Fest Streamer</title>
        <link rel="icon" type="icon" href="/favicon.png"></link>
      </Head>
      <Header />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Page;
