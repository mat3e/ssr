import hypernova, { serialize, load } from 'hypernova';
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { getDataFromTree } from '@apollo/react-ssr';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createClient, ApolloClient } from './client';
import { PropsWithClient } from './withApollo';

// TODO: OSS
export const renderReactWithApollo = (name: string, Component: ComponentType<PropsWithClient>) => hypernova({
  server() {
    return async (props: object) => {
      const graphQlClient: ApolloClient<NormalizedCacheObject> = createClient();
      // fetch all the data!
      await getDataFromTree(<Component {...props} client={graphQlClient} />);
      const FullComponent: ComponentType<PropsWithClient> = withApolloCache(Component, graphQlClient.extract());
      // actual render with the same client and its cached data = no "loading" state rendered on the server
      const content: string = renderToString(<FullComponent {...props} client={graphQlClient} />);
      return serialize(name, content, props);
    };
  },
  client() {
    const payloads = load(name);
    if (payloads) {
      payloads.forEach((payload: any) => {
        const { node, data } = payload;
        const element = React.createElement(Component, data);
        if (ReactDOM.hydrate) {
          ReactDOM.hydrate(element, node);
        } else {
          ReactDOM.render(element, node);
        }
      });
    }
    return Component;
  }
});

export const renderReactWithApolloStatic = (name: string, Component: ComponentType<PropsWithClient>) => hypernova({
  server() {
    return async (props: object) => {
      const graphQlClient: ApolloClient<NormalizedCacheObject> = createClient();
      // fetch all the data!
      await getDataFromTree(<Component {...props} client={graphQlClient} />);
      const FullComponent: ComponentType<PropsWithClient> = withApolloCache(Component, graphQlClient.extract());
      // actual render with the same client and its cached data = no "loading" state rendered on the server
      renderToStaticMarkup(<FullComponent {...props} client={graphQlClient} />);
    };
  },
  client() { }
});

function withApolloCache(Component: ComponentType<PropsWithClient>, clientCache: NormalizedCacheObject): ComponentType<PropsWithClient> {
  return (props: PropsWithClient) => (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.__APOLLO_STATE__=${JSON.stringify(clientCache).replace(/</g, "\\u003c")};
            document.currentScript && document.currentScript.remove();
          `
        }}
      />
      <Component {...props} />
    </>
  );
}