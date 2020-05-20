import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../apolloClient';
import Page from '../components/Page';
import '../styles/style.scss';

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </ApolloProvider>
);

// Wraps all components in the tree with the data provider
export default withData(App);
