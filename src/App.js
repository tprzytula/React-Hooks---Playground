import React, { useState, useLayoutEffect, useCallback } from 'react';
import Counter from './components/counter';
import './App.css';

const colors = [ 'white', 'red', 'green' ];
const initialState = { count: 0, color: colors[0] };
const updateInterval = 1000;

function App() {
    const [ { count, color }, setCounter ] = useState(initialState);
    const resetCounter = useCallback(() => {
        setCounter(initialState);
    }, []);

    useLayoutEffect(() => {
        const interval = setInterval(() => {
            const randomColor = colors[Math.floor((Math.random()*colors.length))];

            setCounter({
                count: count + 1,
                color: randomColor
            });
        }, updateInterval);

        return () => {
            clearInterval(interval);
        }
    }, [ count ]);

    return (
        <div className="App">
            <header className="App-header">
                <Counter
                    count={count}
                    color={color}
                    reset={resetCounter}
                />
            </header>
        </div>
    );
}

export default App;
