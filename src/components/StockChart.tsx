import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface StockChartProps {
  data: { time: string; price: number }[];
  color?: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, color = "#10b981" }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
