import Head from 'next/head';
import Footer from './Footer';

function Page(props) {
  return (
    <div className="site-container">
      <Head>
        <title>Distance Fest Streamer</title>
        <link rel="icon" type="icon" href="../public/favicon.ico"></link>
      </Head>
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Page;
