'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricChartData } from '@/types';

interface TelemetryChartProps {
    data: MetricChartData[];
    dataKey?: string;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ data, dataKey = 'load' }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                    contentStyle={{
                        background: '#000',
                        border: '1px solid #222',
                        borderRadius: '0',
                        fontSize: '10px',
                        fontFamily: 'IBM Plex Mono'
                    }}
                />
                <Area
                    type="stepAfter"
                    dataKey={dataKey}
                    stroke="#FF3D00"
                    strokeWidth={2}
                    fillOpacity={0.1}
                    fill="#FF3D00"
                    animationDuration={1000}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
