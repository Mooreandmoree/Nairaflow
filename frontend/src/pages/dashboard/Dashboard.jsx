import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchCryptoRates } from '../../services/ratesApi';
import CryptoChart from '../../components/charts/CryptoChart';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, wallets, fetchWallets } = useAuth();
  const [rates, setRates] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState('NGN');

  const displayWallets = wallets.length > 0 ? wallets : [
    { currency: 'NGN', balance: 0, symbol: '₦' },
    { currency: 'USD', balance: 0, symbol: '$' },
  ];

  useEffect(() => {
    const loadRates = async () => {
      try {
        const fetchedRates = await fetchCryptoRates();
        setRates(fetchedRates);
      } catch (error) {
        console.error('Failed to fetch rates:', error);
      } finally {
        setIsLoadingRates(false);
      }
    };

    loadRates();
    const interval = setInterval(loadRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentWallet = displayWallets.find(w => w.currency === selectedWallet) || displayWallets[0];
  const balance = currentWallet?.balance || 0;
  const symbol = currentWallet?.currency === 'NGN' ? '₦' : '$';

  const getEquivalent = () => {
    if (!rates) return null;
    if (selectedWallet === 'NGN') {
      return {
        amount: (balance * rates.ngnToUsd).toFixed(2),
        currency: 'USD',
        symbol: '$',
      };
    } else {
      return {
        amount: (balance * rates.usdToNgn).toFixed(2),
        currency: 'NGN',
        symbol: '₦',
      };
    }
  };

  const equivalent = getEquivalent();

  const recentTransactions = [
    { id: 1, type: 'credit', description: 'Deposit', amount: 50000, currency: 'NGN', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', description: 'Transfer to John', amount: 15000, currency: 'NGN', date: '2024-01-14', status: 'completed' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-gradient">{user?.firstName || 'User'}</span>! 👋
          </h1>
          <p className="text-gray-400 mt-2">Here's your financial overview</p>
        </motion.div>

        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-gray-400 mb-2">Total Balance</p>
              
              <div className="flex items-center space-x-4 mb-4">
                {displayWallets.map((wallet) => (
                  <button
                    key={wallet.currency}
                    onClick={() => setSelectedWallet(wallet.currency)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedWallet === wallet.currency
                        ? 'bg-neon text-dark'
                        : 'bg-dark-300 text-gray-400 hover:text-white'
                    }`}
                  >
                    {wallet.currency}
                  </button>
                ))}
              </div>

              <div className="text-5xl font-bold text-white mb-2">
                {symbol}{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>

              {equivalent && rates && (
                <p className="text-gray-400">
                  ≈ {equivalent.symbol}{parseFloat(equivalent.amount).toLocaleString()} {equivalent.currency}
                  <span className="text-xs ml-2 text-gray-500">
                    (1 USD = ₦{rates.usdToNgn?.toLocaleString()})
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
              <Link to="/add-money" className="btn-neon-solid px-6 py-3">
                + Add Money
              </Link>
              <Link to="/send" className="btn-neon px-6 py-3">
                <span>Send Money</span>
              </Link>
              <Link to="/convert" className="px-6 py-3 bg-dark-300 text-white rounded-xl hover:bg-dark-200 transition-colors">
                Convert
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Crypto Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            {rates && (
              <span className="text-xs text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live
              </span>
            )}
          </div>

          {isLoadingRates ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon"></div>
            </div>
          ) : rates ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(rates.crypto || {}).map(([key, crypto]) => (
                <CryptoChart
                  key={key}
                  symbol={crypto.symbol}
                  name={crypto.name}
                  currentPrice={crypto.usd}
                />
              ))}
              
              {/* USD/NGN Card */}
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">USD/NGN</h3>
                    <p className="text-gray-400 text-sm">Forex Rate</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₦{rates.usdToNgn?.toLocaleString()}</p>
                    <p className="text-green-400 text-sm">+0.15%</p>
                  </div>
                </div>
                <div className="h-32 flex items-center justify-center bg-dark-300/50 rounded-lg">
                  <span className="text-4xl">💵</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Unable to load market data</p>
          )}
        </motion.div>

        {/* Quick Actions & Transactions */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/send" className="p-4 bg-dark-300 rounded-xl text-center hover:bg-dark-200 transition-colors">
                <span className="text-2xl mb-2 block">💸</span>
                <span className="text-sm text-gray-300">Send</span>
              </Link>
              <Link to="/add-money" className="p-4 bg-dark-300 rounded-xl text-center hover:bg-dark-200 transition-colors">
                <span className="text-2xl mb-2 block">💰</span>
                <span className="text-sm text-gray-300">Add Money</span>
              </Link>
              <Link to="/convert" className="p-4 bg-dark-300 rounded-xl text-center hover:bg-dark-200 transition-colors">
                <span className="text-2xl mb-2 block">💱</span>
                <span className="text-sm text-gray-300">Convert</span>
              </Link>
              <Link to="/transactions" className="p-4 bg-dark-300 rounded-xl text-center hover:bg-dark-200 transition-colors">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm text-gray-300">History</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
              <Link to="/transactions" className="text-neon text-sm hover:underline">View All</Link>
            </div>

            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-dark-300/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.type === 'credit' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.description}</p>
                        <p className="text-gray-500 text-xs">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No transactions yet</p>
                <Link to="/add-money" className="btn-neon-solid px-6 py-2">
                  Add Money to Get Started
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;