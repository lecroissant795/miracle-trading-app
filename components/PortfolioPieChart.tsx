import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Portfolio, Stock } from '../types';

interface PortfolioPieChartProps {
  portfolio: Portfolio;
  stocks: Stock[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1', '#ec4899', '#8b5cf6'];

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({ portfolio, stocks }) => {
  const data = portfolio.holdings.map(holding => {
    const stock = stocks.find(s => s.symbol === holding.symbol);
    const value = holding.quantity * (stock?.price || 0);
    return {
      name: holding.symbol,
      value: value
    };
  }).filter(item => item.value > 0);

  // Add Cash as a segment? Optional, but good for total allocation
  if (portfolio.cashBalance > 0) {
      data.push({ name: 'Cash', value: portfolio.cashBalance });
  }

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white p-3 rounded-xl shadow-lg border border-slate-700">
          <p className="font-bold mb-1">{payload[0].name}</p>
          <p className="text-sm">
            ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-400">
            {((payload[0].value / totalValue) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[160px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 6, left: 0, bottom: 0 }}>
          <Pie
            data={data}
            cx="38%"
            cy="50%"
            innerRadius={40}
            outerRadius={52}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="middle" 
            align="right" 
            layout="vertical"
            iconType="circle"
            iconSize={6}
            wrapperStyle={{ paddingLeft: 2 }}
            formatter={(value) => (
              <span className="text-slate-600 font-medium text-xs">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioPieChart;
