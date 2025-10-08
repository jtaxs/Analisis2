// src/components/PayrollCostChart.tsx
'use client';

import React from 'react';
import { 
    ResponsiveContainer, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend 
} from 'recharts';

const PayrollCostChart = ({ data }) => {
  
  const formatYAxis = (tickItem) => {
    return `Q${(tickItem / 1000).toFixed(0)}k`;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip 
          formatter={(value) => new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(value)}
        />
        <Legend />
        <Bar dataKey="costo" fill="#8884d8" name="Costo Total" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PayrollCostChart;
