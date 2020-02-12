import React, { useEffect } from 'react';
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
    const { loading, error, data, refetch } = useQuery<GqlData>(GET_CHARACTERS, {
        variables: {
            page, name, status
        },
    });
    useEffect(() => {
        const searchChangedListener: EventListener = (e: Event) => isCustomEvent(e) && name !== e.detail && refetch({ page, status, name: e.detail });
        document.addEventListener('search:changed', searchChangedListener)
        return () => document.removeEventListener('search:changed', searchChangedListener);
    });
    if (loading) return <div>Loading ...</div>;
    if (error) return <div>{error.message}!</div>;
    return (
        <>
            {
                data && data.characters.results ? (data.characters.results.filter(({ image }) => !!image) as Character[])
                    .map(({ name, image }) => (
                        <figure key={image} style={{ display: 'inline-block' }}>
                            <img src={image} />
                            <figcaption>{name}</figcaption>
                        </figure>
                    )) : <div>Error - no data</div>
            }
        </>
    );
}

function isCustomEvent(evt: Event): evt is CustomEvent {
    return (evt as CustomEvent).detail !== undefined;
}

type GqlData = {
    characters: Characters
}

type Characters = {
    info: WithNullableValues<Info>,
    results: WithNullableValues<Character>[] | null
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
