import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SendMoney = () => {
  const [formData, setFormData] = useState({
    recipientAccount: '',
    bankCode: '',
    amount: '',
    narration: '',
    pin: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const banks = [
    { code: '044', name: 'Access Bank' },
    { code: '014', name: 'Afribank' },
    { code: '023', name: 'Citibank' },
    { code: '050', name: 'Ecobank' },
    { code: '011', name: 'First Bank' },
    { code: '214', name: 'FCMB' },
    { code: '058', name: 'GTBank' },
    { code: '030', name: 'Heritage Bank' },
    { code: '301', name: 'Jaiz Bank' },
    { code: '082', name: 'Keystone Bank' },
    { code: '076', name: 'Polaris Bank' },
    { code: '221', name: 'Stanbic IBTC' },
    { code: '068', name: 'Standard Chartered' },
    { code: '232', name: 'Sterling Bank' },
    { code: '033', name: 'UBA' },
    { code: '032', name: 'Union Bank' },
    { code: '035', name: 'Wema Bank' },
    { code: '057', name: 'Zenith Bank' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Transfer successful!');
      setFormData({
        recipientAccount: '',
        bankCode: '',
        amount: '',
        narration: '',
        pin: '',
      });
    } catch (error) {
      toast.error('Transfer failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Send Money</h1>
          <p className="text-gray-400 mb-8">Transfer funds to any Nigerian bank account</p>

          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Bank
                </label>
                <select
                  name="bankCode"
                  value={formData.bankCode}
                  onChange={handleChange}
                  required
                  className="input-neon"
                >
                  <option value="">Choose a bank</option>
                  {banks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="recipientAccount"
                  value={formData.recipientAccount}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="input-neon"
                  placeholder="0123456789"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="100"
                  className="input-neon"
                  placeholder="10,000"
                />
              </div>

              {/* Narration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Narration (Optional)
                </label>
                <input
                  type="text"
                  name="narration"
                  value={formData.narration}
                  onChange={handleChange}
                  maxLength="100"
                  className="input-neon"
                  placeholder="Payment for..."
                />
              </div>

              {/* PIN */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Transaction PIN
                </label>
                <input
                  type="password"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  required
                  maxLength="4"
                  pattern="[0-9]{4}"
                  className="input-neon"
                  placeholder="••••"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-neon-solid py-4 text-lg font-semibold"
              >
                {isLoading ? 'Processing...' : 'Send Money'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SendMoney;