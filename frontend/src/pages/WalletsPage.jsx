import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { walletAPI, transactionAPI } from '../services/api';
import CurrencyIcon from '../components/SVG/CurrencyIcon';
import { 
  HiPlus, 
  HiMinus,
  HiXMark,
  HiArrowPath,
  HiCheckCircle
} from 'react-icons/hi2';

const WalletsPage = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('deposit'); // deposit or withdraw
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const response = await walletAPI.getWallets();
      setWallets(response.data);
    } catch (error) {
      toast.error('Failed to fetch wallets');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, currency) => {
    setModalType(type);
    setSelectedCurrency(currency);
    setAmount('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setProcessing(true);

    try {
      if (modalType === 'deposit') {
        await transactionAPI.deposit({
          currency: selectedCurrency,
          amount: parseFloat(amount),
          description: `Simulated ${selectedCurrency} deposit`,
        });
        toast.success(`Successfully deposited ${selectedCurrency} ${amount}`);
      } else {
        await transactionAPI.withdraw({
          sourceCurrency: selectedCurrency,
          targetCurrency: selectedCurrency,
          amount: parseFloat(amount),
          description: `${selectedCurrency} withdrawal`,
        });
        toast.success(`Successfully withdrew ${selectedCurrency} ${amount}`);
      }
      
      setModalOpen(false);
      fetchWallets();
    } catch (error) {
      const message = error.response?.data?.message || 'Transaction failed';
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount, currency) => {
    if (amount === null || amount === undefined) return '0.00';
    const symbol = currency === 'NGN' ? '₦' : '$';
    return `${symbol}${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return <WalletsSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">My Wallets</h1>
        <p className="text-gray-400">Manage your USD and NGN balances</p>
      </motion.div>

      {/* Wallet Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {wallets.map((wallet, index) => (
          <motion.div
            key={wallet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon/30 via-transparent to-emerald-500/20 rounded-2xl blur-sm" />
            
            <div className="relative glass-card p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <CurrencyIcon currency={wallet.currency} size={60} />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{wallet.currency} Wallet</h2>
                    <p className="text-gray-400 text-sm">
                      {wallet.currency === 'USD' ? 'US Dollar' : 'Nigerian Naira'}
                    </p>
                  </div>
                </div>
                <span className="badge-success">Active</span>
              </div>

              {/* Balance */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2">Available Balance</p>
                <p className="text-4xl lg:text-5xl font-bold text-gradient">
                  {formatCurrency(wallet.balance, wallet.currency)}
                </p>
              </div>

              {/* Balance Details */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-dark-300/50 rounded-xl">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Available</p>
                  <p className="text-white font-semibold">
                    {formatCurrency(wallet.availableBalance, wallet.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Locked</p>
                  <p className="text-gray-400 font-semibold">
                    {formatCurrency(wallet.lockedBalance, wallet.currency)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal('deposit', wallet.currency)}
                  className="flex-1 btn-neon-solid py-3 flex items-center justify-center gap-2"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>Deposit</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal('withdraw', wallet.currency)}
                  className="flex-1 btn-neon py-3 flex items-center justify-center gap-2"
                >
                  <span><HiMinus className="w-5 h-5 inline mr-2" />Withdraw</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 border-l-4 border-neon"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-neon/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Sandbox Environment</h3>
            <p className="text-gray-400 text-sm">
              This is a demo environment. Deposits are simulated and no real funds are processed. 
              Feel free to test with any amount!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <div className="glass-card p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CurrencyIcon currency={selectedCurrency} size={40} />
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {modalType === 'deposit' ? 'Deposit' : 'Withdraw'} {selectedCurrency}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {modalType === 'deposit' ? 'Add funds to your wallet' : 'Remove funds from your wallet'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <HiXMark className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount ({selectedCurrency})
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                        {selectedCurrency === 'NGN' ? '₦' : '$'}
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="1"
                        step="0.01"
                        className="input-neon pl-12 text-2xl font-semibold"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Quick Amounts */}
                  <div className="flex gap-2 mb-6">
                    {(selectedCurrency === 'USD' ? [100, 500, 1000] : [50000, 100000, 500000]).map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => setAmount(quickAmount.toString())}
                        className="flex-1 py-2 px-3 bg-dark-300 hover:bg-neon/20 border border-gray-700 hover:border-neon/50 rounded-lg text-sm text-gray-300 hover:text-neon transition-all"
                      >
                        {selectedCurrency === 'NGN' ? '₦' : '$'}{quickAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={processing || !amount}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-neon-solid py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <HiArrowPath className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <HiCheckCircle className="w-5 h-5" />
                        <span>
                          {modalType === 'deposit' ? 'Deposit' : 'Withdraw'} {selectedCurrency}
                        </span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Skeleton
const WalletsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div>
      <div className="h-8 w-48 bg-dark-300 rounded-lg mb-2" />
      <div className="h-4 w-64 bg-dark-300 rounded" />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="h-80 bg-dark-300 rounded-2xl" />
      ))}
    </div>
  </div>
);

export default WalletsPage;