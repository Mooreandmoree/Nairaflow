import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { transactionAPI } from '../services/api';
import TransactionIcon from '../components/SVG/TransactionIcon';
import { 
  HiMagnifyingGlass,
  HiFunnel,
  HiArrowPath,
  HiDocumentText,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi2';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [page, filter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let response;
      
      if (filter === 'ALL') {
        response = await transactionAPI.getAll(page, 10);
      } else {
        response = await transactionAPI.getByType(filter, page, 10);
      }
      
      setTransactions(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
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
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-neon/20 text-neon';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400';
      case 'PROCESSING': return 'bg-blue-500/20 text-blue-400';
      case 'FAILED': return 'bg-red-500/20 text-red-400';
      case 'ROLLED_BACK': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case 'DEPOSIT': return 'text-neon';
      case 'WITHDRAWAL': return 'text-red-400';
      case 'CONVERSION': return 'text-blue-400';
      default: return 'text-white';
    }
  };

  const getAmountPrefix = (type) => {
    switch (type) {
      case 'DEPOSIT': return '+';
      case 'WITHDRAWAL': return '-';
      default: return '';
    }
  };

  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Deposits', value: 'DEPOSIT' },
    { label: 'Withdrawals', value: 'WITHDRAWAL' },
    { label: 'Conversions', value: 'CONVERSION' },
  ];

  const filteredTransactions = transactions.filter(tx => 
    search === '' || 
    tx.referenceId?.toLowerCase().includes(search.toLowerCase()) ||
    tx.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-gray-400">View and track all your transactions</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchTransactions}
          className="btn-neon px-4 py-2 flex items-center gap-2 self-start md:self-auto"
        >
          <span>
            <HiArrowPath className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </span>
          <span>Refresh</span>
        </motion.button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by reference ID..."
              className="input-neon pl-12"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <HiFunnel className="w-5 h-5 text-gray-500 flex-shrink-0" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value);
                  setPage(0);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  filter === f.value
                    ? 'bg-neon text-dark'
                    : 'bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        {loading ? (
          <TransactionsSkeleton />
        ) : filteredTransactions.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <div>
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-dark-300/50 text-sm font-medium text-gray-400 border-b border-gray-800">
              <div className="col-span-4">Transaction</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Reference</div>
            </div>

            {/* Transaction Rows */}
            <div className="divide-y divide-gray-800">
              {filteredTransactions.map((tx, index) => {
                const dateInfo = formatDate(tx.createdAt);
                
                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-dark-300/30 transition-colors"
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <TransactionIcon type={tx.type} size={36} />
                          <div>
                            <p className="font-medium text-white">
                              {tx.type === 'DEPOSIT' && `${tx.sourceCurrency} Deposit`}
                              {tx.type === 'WITHDRAWAL' && `${tx.sourceCurrency} Withdrawal`}
                              {tx.type === 'CONVERSION' && `${tx.sourceCurrency} → ${tx.targetCurrency}`}
                            </p>
                            <p className="text-xs text-gray-500">{dateInfo.date} at {dateInfo.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getAmountColor(tx.type)}`}>
                            {getAmountPrefix(tx.type)}{formatCurrency(tx.amount, tx.sourceCurrency)}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Ref: {tx.referenceId}</span>
                        {tx.type === 'CONVERSION' && tx.convertedAmount && (
                          <span className="text-neon">
                            → {formatCurrency(tx.convertedAmount, tx.targetCurrency)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      {/* Transaction Info */}
                      <div className="col-span-4 flex items-center gap-3">
                        <TransactionIcon type={tx.type} size={40} />
                        <div>
                          <p className="font-medium text-white">
                            {tx.type === 'DEPOSIT' && `${tx.sourceCurrency} Deposit`}
                            {tx.type === 'WITHDRAWAL' && `${tx.sourceCurrency} Withdrawal`}
                            {tx.type === 'CONVERSION' && `Convert ${tx.sourceCurrency} to ${tx.targetCurrency}`}
                          </p>
                          {tx.description && (
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                              {tx.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="col-span-2">
                        <p className={`font-semibold ${getAmountColor(tx.type)}`}>
                          {getAmountPrefix(tx.type)}{formatCurrency(tx.amount, tx.sourceCurrency)}
                        </p>
                        {tx.type === 'CONVERSION' && tx.convertedAmount && (
                          <p className="text-xs text-gray-400">
                            → {formatCurrency(tx.convertedAmount, tx.targetCurrency)}
                          </p>
                        )}
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="col-span-2">
                        <p className="text-white text-sm">{dateInfo.date}</p>
                        <p className="text-gray-500 text-xs">{dateInfo.time}</p>
                      </div>

                      {/* Reference */}
                      <div className="col-span-2">
                        <p className="text-gray-400 text-xs font-mono truncate" title={tx.referenceId}>
                          {tx.referenceId}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 rounded-lg bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i;
              } else if (page < 3) {
                pageNum = i;
              } else if (page > totalPages - 4) {
                pageNum = totalPages - 5 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    page === pageNum
                      ? 'bg-neon text-dark'
                      : 'bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200'
                  }`}
                >
                  {pageNum + 1}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="p-2 rounded-lg bg-dark-300 text-gray-400 hover:text-white hover:bg-dark-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Empty State Component
const EmptyState = ({ filter }) => (
  <div className="p-12 text-center">
    <div className="w-20 h-20 mx-auto mb-4 bg-dark-300 rounded-full flex items-center justify-center">
      <HiDocumentText className="w-10 h-10 text-gray-600" />
    </div>
    <h3 className="text-lg font-medium text-white mb-2">No transactions found</h3>
    <p className="text-gray-400">
      {filter === 'ALL' 
        ? 'Start by making a deposit to your wallet' 
        : `No ${filter.toLowerCase()} transactions yet`}
    </p>
  </div>
);

// Skeleton Loader Component
const TransactionsSkeleton = () => (
  <div className="divide-y divide-gray-800">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-dark-300 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-dark-300 rounded w-1/3 mb-2" />
            <div className="h-3 bg-dark-300 rounded w-1/4" />
          </div>
          <div className="text-right">
            <div className="h-4 bg-dark-300 rounded w-20 mb-2" />
            <div className="h-3 bg-dark-300 rounded w-16" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TransactionsPage;