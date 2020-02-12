import React, { useState, useEffect } from 'react';

export default ({welcome = 'Hello'}) => {
    const [random, setRandom] = useState(Math.random().toString());
    useEffect(() => {
        if (window && window.setInterval) {
            let interval: number | undefined;
            interval = window.setInterval(() => {
                setRandom(Math.random().toString());
            }, 1000);
            return () => window.clearInterval(interval);
        }
    });
    return <h1>{welcome} {random}! Nice SSR we got here!</h1>
};
