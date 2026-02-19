import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchCryptoRates, calculateConversion } from '../../services/ratesApi';
import toast from 'react-hot-toast';

const ConvertCurrency = () => {
  const [rates, setRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState('NGN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [conversion, setConversion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currencies = ['NGN', 'USD', 'USDT', 'BTC', 'ETH'];

  useEffect(() => {
    const loadRates = async () => {
      const data = await fetchCryptoRates();
      setRates(data);
    };
    loadRates();
  }, []);

  useEffect(() => {
    if (amount && rates) {
      const result = calculateConversion(parseFloat(amount), fromCurrency, toCurrency, rates);
      setConversion(result);
    } else {
      setConversion(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = async () => {
    if (!conversion) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(`Successfully converted ${amount} ${fromCurrency} to ${conversion.finalAmount.toFixed(2)} ${toCurrency}`);
    setAmount('');
    setConversion(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Convert Currency</h1>
          <p className="text-gray-400 mb-8">Exchange between NGN, USD, and crypto</p>

          <div className="glass-card p-8">
            {/* From Currency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
              <div className="flex space-x-4">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="input-neon flex-shrink-0 w-32"
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="input-neon flex-1"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={handleSwap}
                className="w-12 h-12 rounded-full bg-dark-300 flex items-center justify-center hover:bg-dark-200 transition-colors"
              >
                <span className="text-2xl">⇅</span>
              </button>
            </div>

            {/* To Currency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
              <div className="flex space-x-4">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="input-neon flex-shrink-0 w-32"
                >
                  {currencies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="input-neon flex-1 flex items-center bg-dark-400">
                  <span className="text-white font-semibold">
                    {conversion ? conversion.finalAmount.toFixed(6) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Conversion Details */}
            {conversion && (
              <div className="bg-dark-300/50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-white">1 {fromCurrency} = {conversion.rate.toFixed(6)} {toCurrency}</span>
                </div>
                {conversion.fee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fee ({conversion.feePercentage}%)</span>
                    <span className="text-yellow-400">-{conversion.fee.toFixed(2)} {toCurrency}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                  <span className="text-gray-400">You'll receive</span>
                  <span className="text-neon font-semibold">{conversion.finalAmount.toFixed(6)} {toCurrency}</span>
                </div>
              </div>
            )}

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!conversion || isLoading}
              className="w-full btn-neon-solid py-4 text-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Converting...' : 'Convert Now'}
            </button>

            {/* Rate Info */}
            {rates && (
              <p className="text-center text-xs text-gray-500 mt-4">
                Rates updated: {new Date(rates.lastUpdated).toLocaleTimeString()}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConvertCurrency;