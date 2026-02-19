import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const CryptoChart = ({ symbol, name, currentPrice, color = '#39ff14' }) => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    // Generate realistic-looking chart data
    const generateChartData = () => {
      const now = Date.now();
      const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
      const interval = timeRange === '24h' ? 3600000 : 86400000;
      
      let data = [];
      let price = currentPrice;
      const volatility = symbol === 'BTC' ? 0.02 : symbol === 'ETH' ? 0.03 : 0.005;
      
      for (let i = points; i >= 0; i--) {
        const change = (Math.random() - 0.5) * 2 * volatility;
        price = price * (1 + change);
        
        data.push({
          time: new Date(now - i * interval).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: timeRange === '24h' ? 'numeric' : undefined,
          }),
          price: price,
        });
      }
      
      // Calculate price change
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      setPriceChange(((lastPrice - firstPrice) / firstPrice) * 100);
      
      return data;
    };

    setChartData(generateChartData());
  }, [currentPrice, symbol, timeRange]);

  const isPositive = priceChange >= 0;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold">${currentPrice?.toLocaleString()}</p>
          <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-4">
        {['24h', '7d', '30d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              timeRange === range
                ? 'bg-neon text-dark'
                : 'bg-dark-300 text-gray-400 hover:text-white'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#39ff14' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="100%" stopColor={isPositive ? '#39ff14' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#888' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#39ff14' : '#ef4444'}
              strokeWidth={2}
              fill={`url(#gradient-${symbol})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoChart;