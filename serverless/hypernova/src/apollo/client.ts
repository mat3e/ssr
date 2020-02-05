import { ApolloClient } from 'apollo-client';
export { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
export { NormalizedCacheObject } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

let client: ApolloClient<NormalizedCacheObject> | null = null;

// TODO: OSS, url as a parameter
/**
 * Creates a server-specific client for each request or exposes a browser-specific client, consuming data from the cache.
 */
export function createClient(): ApolloClient<NormalizedCacheObject> {
    if (isBrowser() && !client) {
        client = new ApolloClient({
            link: createHttpLink({
                uri: 'https://rickandmortyapi.com/graphql'
            }),
            cache: new InMemoryCache().restore(((window as any).__APOLLO_STATE__) || {})
        });
    }
    if (client) {
        return client;
    }
    // each server component needs a new client
    return new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
            uri: 'https://rickandmortyapi.com/graphql',
            fetch
        }),
        cache: new InMemoryCache()
    });
}

function isBrowser() {
    return typeof process === 'undefined' || (process as any).type === 'renderer' || (process as any).browser || (process as any).__nwjs;
}