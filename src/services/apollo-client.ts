import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";

import { AUTH_TOKEN } from "./constants";

const httpLink =  new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
        const token = localStorage.getItem(AUTH_TOKEN);
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    });

    return forward(operation);
});

export const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
});
