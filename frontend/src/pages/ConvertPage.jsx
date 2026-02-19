import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { walletAPI, transactionAPI, fxAPI } from '../services/api';
import CurrencyIcon from '../components/SVG/CurrencyIcon';
import { 
  HiArrowsRightLeft, 
  HiArrowPath,
  HiCheckCircle,
  HiClock,
  HiLockClosed
} from 'react-icons/hi2';

const ConvertPage = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('NGN');
  const [amount, setAmount] = useState('');
  const [preview, setPreview] = useState(null);
  const [fxRate, setFxRate] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && preview) {
      setPreview(null);
      toast.error('Rate lock expired. Please get a new quote.');
    }
  }, [countdown]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletRes, fxRes] = await Promise.all([
        walletAPI.getWallets(),
        fxAPI.getCurrentRate(),
      ]);
      setWallets(walletRes.data);
      setFxRate(fxRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount('');
    setPreview(null);
  };

  const getPreview = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      const response = await transactionAPI.getPreview(fromCurrency, toCurrency, parseFloat(amount));
      setPreview(response.data);
      setCountdown(60);
    } catch (error) {
      toast.error('Failed to get conversion preview');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!preview) {
      toast.error('Please get a quote first');
      return;
    }

    setConverting(true);

    try {
      await transactionAPI.convert({
        sourceCurrency: fromCurrency,
        targetCurrency: toCurrency,
        amount: parseFloat(amount),
        rateLockId: preview.rateLockId,
      });
      
      toast.success('Conversion successful!');
      setAmount('');
      setPreview(null);
      setCountdown(0);
      fetchData();
    } catch (error) {
      const message = error.response?.data?.message || 'Conversion failed';
      toast.error(message);
    } finally {
      setConverting(false);
    }
  };

  const formatCurrency = (value, currency) => {
    if (value === null || value === undefined) return '0.00';
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getWalletBalance = (currency) => {
    const wallet = wallets.find(w => w.currency === currency);
    return wallet?.availableBalance || 0;
  };

  if (loading && !wallets.length) {
    return <ConvertSkeleton />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Convert Currency</h1>
        <p className="text-gray-400">Exchange between USD and NGN instantly</p>
      </motion.div>

      {/* FX Rate Display */}
      {fxRate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2">
            <CurrencyIcon currency="USD" size={24} />
            <span className="text-white font-medium">1 USD</span>
          </div>
          <HiArrowsRightLeft className="w-5 h-5 text-neon" />
          <div className="flex items-center gap-2">
            <CurrencyIcon currency="NGN" size={24} />
            <span className="text-neon font-bold">₦{parseFloat(fxRate.rate).toLocaleString()}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {fxRate.feePercentage}% fee
          </span>
        </motion.div>
      )}

      {/* Conversion Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 lg:p-8"
      >
        {/* From Currency */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">From</label>
            <span className="text-xs text-gray-500">
              Balance: {formatCurrency(getWalletBalance(fromCurrency), fromCurrency)}
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setPreview(null);
                }}
                placeholder="0.00"
                className="input-neon text-2xl font-semibold pr-20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <CurrencyIcon currency={fromCurrency} size={24} />
                <span className="text-gray-400 font-medium">{fromCurrency}</span>
              </div>
            </div>
          </div>
          {/* Max Button */}
          <button
            onClick={() => setAmount(getWalletBalance(fromCurrency).toString())}
            className="mt-2 text-xs text-neon hover:underline"
          >
            Use Max
          </button>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={swapCurrencies}
            className="w-12 h-12 bg-neon/20 hover:bg-neon/30 rounded-full flex items-center justify-center text-neon transition-colors"
          >
            <HiArrowsRightLeft className="w-6 h-6" />
          </motion.button>
        </div>

        {/* To Currency */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">To</label>
            <span className="text-xs text-gray-500">
              Balance: {formatCurrency(getWalletBalance(toCurrency), toCurrency)}
            </span>
          </div>
          <div className="relative">
            <div className="input-neon text-2xl font-semibold pr-20 flex items-center min-h-[56px]">
              <span className={preview ? 'text-neon' : 'text-gray-500'}>
                {preview ? formatCurrency(preview.convertedAmount, toCurrency) : '0.00'}
              </span>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <CurrencyIcon currency={toCurrency} size={24} />
              <span className="text-gray-400 font-medium">{toCurrency}</span>
            </div>
          </div>
        </div>

        {/* Preview Details */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-dark-300/50 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white font-medium">
                  1 {fromCurrency} = {formatCurrency(preview.fxRate, toCurrency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Fee ({preview.feePercentage}%)</span>
                <span className="text-red-400">
                  -{formatCurrency(preview.fee, fromCurrency)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-700 pt-3">
                <span className="text-gray-400">You'll receive</span>
                <span className="text-neon font-bold text-lg">
                  {formatCurrency(preview.convertedAmount, toCurrency)}
                </span>
              </div>
              
              {/* Rate Lock Timer */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <HiLockClosed className="w-4 h-4 text-neon" />
                <span className="text-sm text-gray-400">Rate locked for</span>
                <span className={`font-mono font-bold ${countdown <= 10 ? 'text-red-400' : 'text-neon'}`}>
                  {countdown}s
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!preview ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getPreview}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 btn-neon-solid py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiArrowPath className="w-5 h-5" />
              <span>Get Quote</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConvert}
              disabled={converting || countdown === 0}
              className="flex-1 btn-neon-solid py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {converting ? (
                <>
                  <HiArrowPath className="w-5 h-5 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <HiCheckCircle className="w-5 h-5" />
                  <span>Confirm Conversion</span>
                </>
              )}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 bg-neon/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <HiLockClosed className="w-5 h-5 text-neon" />
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Rate Lock</h3>
            <p className="text-sm text-gray-400">
              Your quoted rate is locked for 60 seconds to protect against market changes.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 flex items-start gap-3"
        >
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <HiClock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Instant Conversion</h3>
            <p className="text-sm text-gray-400">
              Funds are converted and credited to your wallet instantly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Skeleton
const ConvertSkeleton = () => (
  <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
    <div className="text-center">
      <div className="h-8 w-48 bg-dark-300 rounded-lg mx-auto mb-2" />
      <div className="h-4 w-64 bg-dark-300 rounded mx-auto" />
    </div>
    <div className="h-16 bg-dark-300 rounded-xl" />
    <div className="h-96 bg-dark-300 rounded-2xl" />
  </div>
);

export default ConvertPage;