import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddMoney = () => {
  const { user, fetchWallets } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [5000, 10000, 20000, 50000, 100000];

  const handlePaystackPayment = () => {
    if (!amount || parseFloat(amount) < 100) {
      toast.error("Minimum amount is ₦100");
      return;
    }

    setIsLoading(true);

    // Initialize Paystack
    const handler = window.PaystackPop?.setup({
      key: "pk_test_2554897c67f7a1582cfb0287921bc8bd867690bc", // Replace with your test key
      email: user?.email || "user@example.com",
      amount: Math.round(parseFloat(amount) * 100), // Convert to kobo
      currency: "NGN",
      ref: `NF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      callback: function (response) {
        console.log("Payment successful:", response);
        toast.success(
          `Successfully added ₦${parseFloat(amount).toLocaleString()} to your wallet!`,
        );
        fetchWallets();
        navigate("/dashboard");
      },
      onClose: function () {
        setIsLoading(false);
        toast.error("Payment cancelled");
      },
    });

    if (handler) {
      handler.openIframe();
    } else {
      // Fallback for demo
      toast.success(
        `Demo: ₦${parseFloat(amount).toLocaleString()} would be added to your wallet`,
      );
      setIsLoading(false);
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      handlePaystackPayment();
    } else {
      // Bank transfer logic
      toast.success("Bank transfer details have been sent to your email");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Add Money</h1>
          <p className="text-gray-400 mb-8">Fund your NairaFlow wallet</p>

          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="100"
                    className="input-neon pl-10 text-2xl font-semibold"
                  />
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      amount === quickAmount.toString()
                        ? "bg-neon text-dark"
                        : "bg-dark-300 text-gray-400 hover:text-white"
                    }`}
                  >
                    ₦{quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-neon bg-neon/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">💳</span>
                    <span className="text-white font-medium">Card Payment</span>
                    <p className="text-xs text-gray-500 mt-1">
                      Mastercard, Visa, Verve
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "bank"
                        ? "border-neon bg-neon/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">🏦</span>
                    <span className="text-white font-medium">
                      Bank Transfer
                    </span>
                    <p className="text-xs text-gray-500 mt-1">USSD, Transfer</p>
                  </button>
                </div>
              </div>

              {/* Supported Methods */}
              <div className="flex items-center justify-center space-x-4 py-4 border-t border-gray-700">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-6"
                />
                <span className="text-gray-500 text-sm">+ More</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !amount}
                className="w-full btn-neon-solid py-4 text-lg font-semibold disabled:opacity-50"
              >
                {isLoading
                  ? "Processing..."
                  : `Add ₦${amount ? parseFloat(amount).toLocaleString() : "0"}`}
              </button>
            </form>

            {/* Security Note */}
            <p className="text-center text-xs text-gray-500 mt-6">
              🔒 Secured by Paystack • 256-bit SSL encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddMoney;
