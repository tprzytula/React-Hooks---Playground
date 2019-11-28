import React from 'react';
import useReportPropChanges from '../hooks/useReportPropChanges';

function Counter(props = {}) {
    const {
        color = 'white',
        count = 0,
        title = 'Counter',
        reset = () => {}
    } = props;

    useReportPropChanges('Counter', props);
    return (
        <div>
            { title }: <span style={{ color }}>{ count }</span>
            <br/>
            <button onClick={ reset }>Reset</button>
        </div>
    );
}

export default Counter;
