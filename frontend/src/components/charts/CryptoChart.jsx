import React, { useState, useEffect } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const CryptoChart = ({ symbol, name, currentPrice, color = '#39ff14' }) => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [priceChange, setPriceChange] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
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
          volume: Math.random() * 1000000 + 500000,
        });
      }

      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      setPriceChange(((lastPrice - firstPrice) / firstPrice) * 100);

      return data;
    };

    setChartData(generateChartData());
  }, [currentPrice, symbol, timeRange]);

  const isPositive = priceChange >= 0;
  const chartColor = isPositive ? '#39ff14' : '#ef4444';

  const stats = chartData.length > 0 ? {
    high: Math.max(...chartData.map(d => d.price)),
    low: Math.min(...chartData.map(d => d.price)),
    avg: chartData.reduce((sum, d) => sum + d.price, 0) / chartData.length,
    volume: chartData.reduce((sum, d) => sum + (d.volume || 0), 0),
  } : { high: 0, low: 0, avg: 0, volume: 0 };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-300 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-xs">{label}</p>
          <p className="text-white font-bold text-sm">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const ChartContent = ({ height = 128, showDetails = false }) => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <p className="text-gray-400 text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">${currentPrice?.toLocaleString()}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-4">
        {['24h', '7d', '30d'].map((range) => (
          <button
            key={range}
            onClick={(e) => { e.stopPropagation(); setTimeRange(range); }}
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
      <div style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${symbol}-${isExpanded ? 'expanded' : 'small'}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            {showDetails && (
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            )}
            <XAxis
              dataKey="time"
              hide={!showDetails}
              stroke="#666"
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis
              hide={!showDetails}
              stroke="#666"
              tick={{ fill: '#888', fontSize: 12 }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#gradient-${symbol}-${isExpanded ? 'expanded' : 'small'})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats (only in expanded view) */}
      {showDetails && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-dark-300/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">24h High</p>
            <p className="text-green-400 font-bold">${stats.high.toFixed(2)}</p>
          </div>
          <div className="bg-dark-300/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">24h Low</p>
            <p className="text-red-400 font-bold">${stats.low.toFixed(2)}</p>
          </div>
          <div className="bg-dark-300/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Average</p>
            <p className="text-white font-bold">${stats.avg.toFixed(2)}</p>
          </div>
          <div className="bg-dark-300/50 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs mb-1">Volume</p>
            <p className="text-white font-bold">${(stats.volume / 1000000).toFixed(2)}M</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Small Card */}
      <div
        className="glass-card p-4 cursor-pointer hover:border-neon/30 transition-colors"
        onClick={() => setIsExpanded(true)}
      >
        <ChartContent height={128} showDetails={false} />
        <p className="text-center text-xs text-gray-500 mt-2">Click to expand</p>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="glass-card p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-gray-400 text-sm">Live Data</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-dark-300 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ChartContent height={400} showDetails={true} />

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-dark-300/30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">About {name}</h4>
                <p className="text-gray-400 text-sm">
                  {symbol === 'BTC' && 'Bitcoin is the first and most well-known cryptocurrency, created in 2009 by Satoshi Nakamoto. It operates on a decentralized network using blockchain technology.'}
                  {symbol === 'ETH' && 'Ethereum is a decentralized platform that enables smart contracts and decentralized applications (DApps). It was proposed by Vitalik Buterin in 2013.'}
                  {symbol !== 'BTC' && symbol !== 'ETH' && `${name} (${symbol}) is a cryptocurrency traded on various exchanges worldwide.`}
                </p>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="w-full mt-4 btn-neon-solid py-3"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CryptoChart;
