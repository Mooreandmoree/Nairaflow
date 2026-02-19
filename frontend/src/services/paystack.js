// Paystack Test Public Key (use your own for production)
// Get yours at: https://dashboard.paystack.com/#/settings/developers
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

export const initializePaystack = (email, amount, onSuccess, onClose) => {
  // Amount should be in kobo (NGN * 100)
  const amountInKobo = Math.round(amount * 100);
  
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amountInKobo,
    currency: 'NGN',
    ref: `NF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    callback: function(response) {
      console.log('Payment successful:', response);
      onSuccess(response);
    },
    onClose: function() {
      console.log('Payment window closed');
      onClose?.();
    },
  });
  
  handler.openIframe();
};

// For card payments without Paystack popup
export const processCardPayment = async (cardDetails, amount) => {
  // This would typically go to your backend
  // For now, return a mock success
  return {
    success: true,
    reference: `NF_${Date.now()}`,
    message: 'Payment successful',
  };
};