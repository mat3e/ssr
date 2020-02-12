import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import withApollo from './apollo/WithApollo';

export default withApollo(Tiles);

const GET_CHARACTERS = gql`
    query GetFiltered($page: Int = 1, $name: String!, $status: String!) {
        characters(page: $page, filter: { name: $name, status: $status }) {
            info {
                count
                pages
                next
                prev
            }
            results {
                name
                image
            }
        }
    }
`;

function Tiles({ page = 1, name = '', status = '' }) {
    const { loading, error, data } = useQuery<GqlData>(GET_CHARACTERS, {
        variables: {
            page, name, status
        },
    });
    if (loading) return <div>Loading ...</div>;
    if (error) return <div>{error.message}!</div>;
    return (
        <>
            {
                data ? (data.characters.results.filter(({ image }) => !!image) as Character[])
                    .map(({ name, image }) => (
                        <figure key={image}>
                            <img src={image} />
                            <figcaption>{name}</figcaption>
                        </figure>
                    )) : <div>Error - no data</div>
            }
        </>
    );
}

type GqlData = {
    characters: Characters
}

type Characters = {
    info: WithNullableValues<Info>,
    results: WithNullableValues<Character>[]
}

type Info = {
    count: number,
    pages: number,
    next: number,
    prev: number
}

type Character = {
    name: string,
    image: string
}

type WithNullableValues<T> = {
    [P in keyof T]: T[P] | null;
}
