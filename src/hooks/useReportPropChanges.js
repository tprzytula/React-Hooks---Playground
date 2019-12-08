import { useEffect, useRef, useReducer } from 'react';

const ActionTypes = {
    NEW_CHANGE: 'NEW_CHANGE'
};

const propChangesReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_CHANGE: {
            return {
                ...state,
                lastChange: action.payload.newChange
            };
        }
        default:
            break;
    }
};

function getUniqueChanges(previousProps, newProps) {
    const mergedProps = { ...previousProps, ...newProps };

    return Object.keys(mergedProps).reduce((accumulator, currentValue) => {
        if (previousProps[currentValue] === newProps[currentValue]) {
            return accumulator;
        }

        return {
            ...accumulator,
            [currentValue]: {
                from: previousProps[currentValue],
                to: newProps[currentValue]
            }
        };
    }, {});
}

function useReportPropChanges(componentName, newProps) {
    const [{ lastChange }, dispatch] = useReducer(propChangesReducer, { lastChange: {} });
    const previousProps = useRef(null);
    const { current: propsSnapshot } = previousProps;

    useEffect(() => {
        if (propsSnapshot) {
            const uniqueChanges = getUniqueChanges(propsSnapshot, newProps);

            if (Object.keys(uniqueChanges).length > 0) {
                dispatch({
                    type: ActionTypes.NEW_CHANGE,
                    payload: {
                        newChange: uniqueChanges
                    },
                })
            }
        }

        previousProps.current = newProps;
    });

    return [ lastChange ];
}

export default useReportPropChanges;
