# Server-side rendering - micro-frontends

Presentation: [Server-side rendered micro-frontends on AWS Lambda](https://github.com/mat3e/talks/tree/master/docs/micro-frontends) [[slides](https://mat3e.github.io/talks/micro-frontends/att)] [[recording](https://www.youtube.com/watch?v=bOkZ7327FLg)]

1. `react-ssr` - standard React + Express example. No [next.js](https://nextjs.org/)
2. `hypernova` - [AirBnB Hypernova](https://github.com/airbnb/hypernova) for a simple React app (similar to the previous example)
3. `hypernova-graphql` - ambitious example with [Apollo GraphQL](https://www.apollographql.com/docs/react/api/react-ssr/) and React. Consuming [The Rick and Morty API](https://rickandmortyapi.com/)

   _Article which inspired me: [Server Side Rendering for React + Apollo GraphQL Client](https://bessey.dev/blog/2019/01/02/apollo-graphql-hypernova/)_
4. `hypernova-micro` - both React and Vue, full [micro-frontends](https://micro-frontends.org/)

   _Great articles in the topic: [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html), [Micro-frontends using Vue.js, React.js, and Hypernova](https://medium.com/js-dojo/micro-frontends-using-vue-js-react-js-and-hypernova-af606a774602)_
5. `serverless` - all the previous things combined with [Serverless](https://serverless.com/). FaaS FTW!

   _Article which inspired me: [Serverless Micro-frontends using Vue.js, AWS Lambda, and Hypernova](https://medium.com/js-dojo/serverless-micro-frontends-using-vue-js-aws-lambda-and-hypernova-835d6f2b3bc9)_

   ___
   Just 1 `.gitignore` for all the things!

   No monorepo, because I don't know it. Contributors are welcome :D
