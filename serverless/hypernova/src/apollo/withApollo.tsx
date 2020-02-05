import React, { ComponentType } from 'react';
import { ApolloProvider } from '@apollo/react-common';
import { createClient, ApolloClient, NormalizedCacheObject } from './client';

/**
 * HOC to give a structure expected by {@link renderReactWithApollo}.
 */
export default (Component: ComponentType<any>) => (props: PropsWithClient) => (
    <ApolloProvider client={props.client || createClient()}>
        <Component {...props} />
    </ApolloProvider>
)

export type PropsWithClient = {
    [key: string]: any,
    client: ApolloClient<NormalizedCacheObject>
};