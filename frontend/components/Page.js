import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Page(props) {
  return (
    <div className='site-container'>
      <Head>
        <title>Distance Fest // NYE : Live Music from Safe Spaces</title>
        <link rel='icon' type='icon' href='/favicon.png'></link>
        <meta
          property='og:title'
          content='Distance Fest // NYE : Live Music from Safe Spaces'
        />
        <meta
          property='og:description'
          content='Live Streaming Music from Safe Spaces'
        />
        <meta
          property='og:image'
          content='https://distancefest.com/dfheader.png'
        />
      </Head>
      <div className='main'>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Page;
