import React from 'react';
import useReportPropChanges from '../hooks/useReportPropChanges';

const renderLastChanges = changes => {
    const renderRow = ({ key, index, value }) => {
        return (
            <tr key={ index }>
                <td>{ key }</td>
                <td style={{ color: value.from }}>{ value.from }</td>
                <td style={{ color: value.to }}>{ value.to }</td>
            </tr>
        )
    };
    return (
        <table>
            <thead>
                <tr>
                    <th>Prop name</th>
                    <th>From</th>
                    <th>To</th>
                </tr>
            </thead>
            <tbody>
            {
                Object.keys(changes).map((key, index) => renderRow({
                    key,
                    index,
                    value: changes[key]
                }))
            }
            </tbody>
        </table>
    )
};

function Counter(props = {}) {
    const {
        color = 'white',
        count = 0,
        title = 'Counter',
        reset = () => {}
    } = props;

    const [ lastChange ] = useReportPropChanges('Counter', props);

    return (
        <div>
            { title }: <span style={{ color }}>{ count }</span>
            <br/>
            <button onClick={ reset }>Reset</button>

            <br/><br/>
            <br/>
            <h3>Recent props update:</h3>
            { renderLastChanges(lastChange) }
        </div>
    );
}

export default Counter;
