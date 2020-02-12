import React, { useState, useEffect } from 'react';

export default () => {
    const [random, setRandom] = useState(Math.random().toString());
    useEffect(() => {
        let interval: number | undefined;
        interval = window.setInterval(() => {
            setRandom(Math.random().toString());
        }, 1000);
        return () => window.clearInterval(interval);
    });
    return <h1>Hello {random}! Nice SSR we got here!</h1>
};
