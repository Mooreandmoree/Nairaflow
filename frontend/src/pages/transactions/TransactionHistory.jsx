import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [filter, page]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      let url = `/transactions?page=${page}&size=20`;
      if (filter !== 'all') {
        url = `/transactions/type/${filter.toUpperCase()}?page=${page}&size=20`;
      }

      const response = await api.get(url);
      const data = response.data;

      if (data.content) {
        setTransactions(data.content);
        setTotalPages(data.totalPages);
      } else if (data.data?.content) {
        setTransactions(data.data.content);
        setTotalPages(data.data.totalPages);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // If API fails, show empty state instead of error
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'DEPOSIT': return '↓';
      case 'WITHDRAWAL': return '↑';
      case 'CONVERSION': return '↔';
      default: return '•';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'DEPOSIT': return 'bg-green-500/20 text-green-400';
      case 'WITHDRAWAL': return 'bg-red-500/20 text-red-400';
      case 'CONVERSION': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-500/20 text-green-400';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400';
      case 'PROCESSING': return 'bg-blue-500/20 text-blue-400';
      case 'FAILED': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAmountDisplay = (tx) => {
    const currency = tx.sourceCurrency === 'NGN' ? '₦' : '$';
    const amount = parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 });
    const prefix = tx.type === 'DEPOSIT' ? '+' : tx.type === 'WITHDRAWAL' ? '-' : '';
    return `${prefix}${currency}${amount}`;
  };

  const getAmountColor = (type) => {
    switch (type) {
      case 'DEPOSIT': return 'text-green-400';
      case 'WITHDRAWAL': return 'text-red-400';
      case 'CONVERSION': return 'text-blue-400';
      default: return 'text-white';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400 mb-8">View all your past transactions</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { key: 'all', label: 'All' },
              { key: 'DEPOSIT', label: 'Deposits' },
              { key: 'WITHDRAWAL', label: 'Withdrawals' },
              { key: 'CONVERSION', label: 'Conversions' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setPage(0); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-neon text-dark'
                    : 'bg-dark-300 text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Refresh Button */}
            <button
              onClick={fetchTransactions}
              className="px-4 py-2 rounded-lg bg-dark-300 text-gray-400 hover:text-white transition-colors ml-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Transactions List */}
          <div className="glass-card p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-neon" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </div>
            ) : transactions.length > 0 ? (
              <>
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <motion.div
                      key={tx.referenceId || tx.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedTransaction(tx)}
                      className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl hover:bg-dark-300 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getTransactionColor(tx.type)}`}>
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {tx.description || tx.type}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {formatDate(tx.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${getAmountColor(tx.type)}`}>
                          {getAmountDisplay(tx)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <button
                      onClick={() => setPage(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="px-4 py-2 bg-dark-300 text-gray-400 rounded-lg disabled:opacity-50 hover:text-white transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400">
                      Page {page + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                      disabled={page >= totalPages - 1}
                      className="px-4 py-2 bg-dark-300 text-gray-400 rounded-lg disabled:opacity-50 hover:text-white transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-dark-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-400 text-lg mb-2">No transactions yet</p>
                <p className="text-gray-500 text-sm mb-4">Your transaction history will appear here</p>
                <a href="/add-money" className="btn-neon-solid px-6 py-2 inline-block">
                  Add Money to Get Started
                </a>
              </div>
            )}
          </div>

          {/* Transaction Detail Modal */}
          {selectedTransaction && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedTransaction(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Transaction Details</h3>
                  <button onClick={() => setSelectedTransaction(null)} className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 ${getTransactionColor(selectedTransaction.type)}`}>
                    {getTransactionIcon(selectedTransaction.type)}
                  </div>
                  <p className={`text-3xl font-bold ${getAmountColor(selectedTransaction.type)}`}>
                    {getAmountDisplay(selectedTransaction)}
                  </p>
                  <span className={`text-sm px-3 py-1 rounded-full mt-2 inline-block ${getStatusBadge(selectedTransaction.status)}`}>
                    {selectedTransaction.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white font-medium">{selectedTransaction.type}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                    <span className="text-gray-400">Reference</span>
                    <span className="text-white font-medium text-sm">{selectedTransaction.referenceId}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                    <span className="text-gray-400">Currency</span>
                    <span className="text-white font-medium">{selectedTransaction.sourceCurrency}</span>
                  </div>
                  {selectedTransaction.fee && (
                    <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                      <span className="text-gray-400">Fee</span>
                      <span className="text-white font-medium">
                        {selectedTransaction.sourceCurrency === 'NGN' ? '₦' : '$'}
                        {parseFloat(selectedTransaction.fee).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedTransaction.description && (
                    <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                      <span className="text-gray-400">Description</span>
                      <span className="text-white font-medium">{selectedTransaction.description}</span>
                    </div>
                  )}
                  <div className="flex justify-between p-3 bg-dark-300/50 rounded-lg">
                    <span className="text-gray-400">Date</span>
                    <span className="text-white font-medium">{formatDate(selectedTransaction.createdAt)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full mt-6 btn-neon-solid py-3"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionHistory;
