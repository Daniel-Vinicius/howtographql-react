import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../services/apollo-client'

import { Header } from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
