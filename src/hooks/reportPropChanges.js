import { useEffect, useRef } from 'react';

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
    const previousProps = useRef(null);
    const { current: propsSnapshot } = previousProps;

    useEffect(() => {
        if (propsSnapshot) {
            const uniqueChanges = getUniqueChanges(propsSnapshot, newProps);

            if (Object.keys(uniqueChanges).length > 0) {
                console.log(`[${componentName}] Value of the following props changed:`, uniqueChanges);
            }
        }

        previousProps.current = newProps;
    });
}

export default useReportPropChanges;