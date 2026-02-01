import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface StockChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  variant?: 'full' | 'sparkline';
  /** Optional benchmark series (e.g. S&P 500) to show as second line when comparing */
  benchmarkData?: DataPoint[];
  benchmarkColor?: string;
}

const StockChart: React.FC<StockChartProps> = ({ 
  data, 
  color = '#10b981', // Default teal-500 equivalent
  height = 300,
  variant = 'full',
  benchmarkData,
  benchmarkColor = '#64748b'
}) => {
  const isSparkline = variant === 'sparkline';
  const showBenchmark = Boolean(benchmarkData?.length);

  // Merge primary data with benchmark by name so both series share the same x-axis
  const chartData = React.useMemo(() => {
    if (!showBenchmark || !benchmarkData) return data;
    const byName = new Map<string, { name: string; value: number; benchmarkValue?: number }>();
    data.forEach((d) => byName.set(d.name, { ...d }));
    benchmarkData.forEach((d) => {
      const existing = byName.get(d.name);
      if (existing) existing.benchmarkValue = d.value;
      else byName.set(d.name, { name: d.name, value: existing?.value ?? 0, benchmarkValue: d.value });
    });
    return Array.from(byName.values()).sort((a, b) => 
      String(a.name).localeCompare(String(b.name), undefined, { numeric: true })
    );
  }, [data, benchmarkData, showBenchmark]);

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={isSparkline ? { top: 0, right: 0, left: 0, bottom: 0 } : { top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`colorValue-${isSparkline ? 's' : 'f'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            {showBenchmark && (
              <linearGradient id="colorValue-benchmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={benchmarkColor} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={benchmarkColor} stopOpacity={0}/>
              </linearGradient>
            )}
          </defs>
          
          {!isSparkline && (
            <>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }} 
                interval="preserveStartEnd"
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }} 
                domain={['auto', 'auto']}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff', fontWeight: 500 }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                formatter={(value: number, name: string) => {
                  const formatted = value != null ? value.toFixed(2) : '—';
                  if (name === 'benchmarkValue' || name === 'S&P 500') return [formatted, 'S&P 500'];
                  return [formatted, 'You'];
                }}
              />
            </>
          )}

          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={isSparkline ? 2 : 3}
            fillOpacity={1} 
            fill={`url(#colorValue-${isSparkline ? 's' : 'f'})`}
            isAnimationActive={true}
            name="You"
          />
          {showBenchmark && (
            <Area 
              type="monotone" 
              dataKey="benchmarkValue" 
              stroke={benchmarkColor} 
              strokeWidth={2}
              strokeDasharray="6 4"
              fillOpacity={1} 
              fill="url(#colorValue-benchmark)"
              isAnimationActive={true}
              name="S&P 500"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
