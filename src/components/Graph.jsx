// dependencies
import React from 'react';
import { get, last, takeRight } from 'lodash';
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from 'recharts';

// resolver
import { aqiToColor } from '../resolvers/aqiToColor';

const Graph = ({ cities, selectedCity }) => {
    // decide on stroke color based on aqi
    const strokeColor = aqiToColor(get(last(cities[selectedCity]), 'aqi', 0));

    return (
        <ResponsiveContainer>
            <LineChart data={takeRight(cities[selectedCity], 7)}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='updated' />
                <YAxis type='number' domain={[0, 500]} tickCount={12} />
                <Tooltip />
                <Line dataKey='aqi' stroke={strokeColor} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Graph;
