import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TransactionHistory = () => {
  const [filter, setFilter] = useState('all');

  const transactions = [
    { id: 1, type: 'credit', description: 'Deposit from Bank', amount: 50000, currency: 'NGN', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', description: 'Transfer to John Doe', amount: 15000, currency: 'NGN', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'credit', description: 'USD Conversion', amount: 100, currency: 'USD', date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'debit', description: 'Bill Payment - DSTV', amount: 24500, currency: 'NGN', date: '2024-01-12', status: 'completed' },
    { id: 5, type: 'credit', description: 'Received from Jane Smith', amount: 75000, currency: 'NGN', date: '2024-01-11', status: 'completed' },
    { id: 6, type: 'debit', description: 'Transfer to GTBank', amount: 100000, currency: 'NGN', date: '2024-01-10', status: 'pending' },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

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
          <div className="flex space-x-4 mb-6">
            {['all', 'credit', 'debit'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? 'bg-neon text-dark'
                    : 'bg-dark-300 text-gray-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="glass-card p-6">
            <div className="space-y-4">
              {filteredTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-dark-300/50 rounded-xl hover:bg-dark-300 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.type === 'credit' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{tx.description}</p>
                      <p className="text-gray-500 text-sm">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-lg ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{tx.currency === 'NGN' ? '₦' : '$'}{tx.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tx.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionHistory;