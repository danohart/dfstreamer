import Page from "../components/Page";
import "../styles/style.scss";

const App = ({ Component, pageProps, apollo }) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

export default App;
