import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { walletAPI, transactionAPI, fxAPI } from '../services/api';
import CurrencyIcon from '../components/SVG/CurrencyIcon';
import TransactionIcon from '../components/SVG/TransactionIcon';
import { 
  HiArrowTrendingUp, 
  HiArrowTrendingDown,
  HiArrowsRightLeft,
  HiPlus,
  HiArrowRight,
  HiClock
} from 'react-icons/hi2';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [walletSummary, setWalletSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [fxRate, setFxRate] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [walletRes, txRes, fxRes] = await Promise.all([
        walletAPI.getSummary(),
        transactionAPI.getAll(0, 5),
        fxAPI.getCurrentRate(),
      ]);
      
      setWalletSummary(walletRes.data);
      setTransactions(txRes.data.content || []);
      setFxRate(fxRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency) => {
    if (amount === null || amount === undefined) return '0.00';
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  const usdWallet = walletSummary?.wallets?.find(w => w.currency === 'USD');
  const ngnWallet = walletSummary?.wallets?.find(w => w.currency === 'NGN');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-gradient">{user?.fullName?.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your wallets</p>
        </div>
        
        {/* FX Rate Card */}
        {fxRate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card px-6 py-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center">
              <HiArrowsRightLeft className="w-6 h-6 text-neon" />
            </div>
            <div>
              <p className="text-sm text-gray-400">USD/NGN Rate</p>
              <p className="text-2xl font-bold text-gradient">₦{parseFloat(fxRate.rate).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 text-neon text-sm">
              <HiArrowTrendingUp className="w-4 h-4" />
              <span>Live</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Wallet Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* USD Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon/20 via-transparent to-emerald-600/10 rounded-2xl" />
          <div className="relative glass-card p-6">
            <div className="flex items-start justify-between mb-6">
              <CurrencyIcon currency="USD" size={50} />
              <span className="badge-success">Active</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">USD Balance</p>
            <p className="text-3xl font-bold text-white mb-4">
              {formatCurrency(usdWallet?.balance, 'USD')}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available</span>
              <span className="text-neon">{formatCurrency(usdWallet?.availableBalance, 'USD')}</span>
            </div>
          </div>
        </motion.div>

        {/* NGN Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-neon/10 rounded-2xl" />
          <div className="relative glass-card p-6">
            <div className="flex items-start justify-between mb-6">
              <CurrencyIcon currency="NGN" size={50} />
              <span className="badge-success">Active</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">NGN Balance</p>
            <p className="text-3xl font-bold text-white mb-4">
              {formatCurrency(ngnWallet?.balance, 'NGN')}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Available</span>
              <span className="text-neon">{formatCurrency(ngnWallet?.availableBalance, 'NGN')}</span>
            </div>
          </div>
        </motion.div>

        {/* Total Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="md:col-span-2 lg:col-span-1"
        >
          <div className="glass-card p-6 h-full bg-gradient-to-br from-dark-300 to-dark-400">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <HiArrowTrendingUp className="w-6 h-6 text-neon" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Value (NGN)</p>
            <p className="text-3xl font-bold text-gradient mb-4">
              {formatCurrency(walletSummary?.totalBalanceInNGN, 'NGN')}
            </p>
            <Link 
              to="/wallets" 
              className="inline-flex items-center gap-2 text-neon text-sm hover:gap-3 transition-all"
            >
              View all wallets
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Deposit USD', icon: HiPlus, path: '/wallets', color: 'from-blue-500 to-cyan-500' },
            { label: 'Deposit NGN', icon: HiPlus, path: '/wallets', color: 'from-neon to-emerald-500' },
            { label: 'Convert', icon: HiArrowsRightLeft, path: '/convert', color: 'from-purple-500 to-pink-500' },
            { label: 'History', icon: HiClock, path: '/transactions', color: 'from-orange-500 to-yellow-500' },
          ].map((action, index) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={action.path}
                className="block glass-card p-4 text-center group hover:border-neon/50 transition-all"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${action.color} p-0.5`}>
                  <div className="w-full h-full bg-dark-400 rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <Link to="/transactions" className="text-neon text-sm hover:underline">
            View all
          </Link>
        </div>
        
        <div className="glass-card overflow-hidden">
          {transactions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-dark-300 rounded-full flex items-center justify-center">
                <HiClock className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 mb-2">No transactions yet</p>
              <p className="text-gray-500 text-sm">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 hover:bg-dark-300/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <TransactionIcon type={tx.type} size={40} />
                      <div>
                        <p className="font-medium text-white">
                          {tx.type === 'DEPOSIT' && `${tx.sourceCurrency} Deposit`}
                          {tx.type === 'WITHDRAWAL' && `${tx.sourceCurrency} Withdrawal`}
                          {tx.type === 'CONVERSION' && `${tx.sourceCurrency} → ${tx.targetCurrency}`}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(tx.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        tx.type === 'DEPOSIT' ? 'text-neon' : 
                        tx.type === 'WITHDRAWAL' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {tx.type === 'DEPOSIT' ? '+' : tx.type === 'WITHDRAWAL' ? '-' : ''}
                        {formatCurrency(tx.amount, tx.sourceCurrency)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        tx.status === 'COMPLETED' ? 'bg-neon/20 text-neon' :
                        tx.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Skeleton Loader
const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="flex justify-between items-center">
      <div>
        <div className="h-8 w-64 bg-dark-300 rounded-lg mb-2" />
        <div className="h-4 w-48 bg-dark-300 rounded" />
      </div>
      <div className="h-20 w-48 bg-dark-300 rounded-xl" />
    </div>
    
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-dark-300 rounded-2xl" />
      ))}
    </div>
    
    <div className="h-32 bg-dark-300 rounded-2xl" />
    <div className="h-64 bg-dark-300 rounded-2xl" />
  </div>
);

export default Dashboard;