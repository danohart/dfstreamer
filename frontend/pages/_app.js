import { withData } from '../lib/withData';
import { ApolloProvider } from '@apollo/react-hooks';
import Page from '../components/Page';
import '../styles/style.scss';

const App = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </ApolloProvider>
);

export default withData(({ initialState }) => {
  return new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache().restore(initialState || {}),
  });
})(App);
