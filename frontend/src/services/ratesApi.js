// Free API - No API key required!
// CoinGecko Free API: https://api.coingecko.com/api/v3/

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

// Cache rates for 60 seconds to avoid rate limiting
let ratesCache = null;
let lastFetch = 0;
const CACHE_DURATION = 60000; // 60 seconds

export const fetchCryptoRates = async () => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (ratesCache && (now - lastFetch) < CACHE_DURATION) {
    return ratesCache;
  }

  try {
    // Get USD to NGN rate and crypto prices
    const [cryptoResponse, ngnResponse] = await Promise.all([
      fetch(`${COINGECKO_BASE}/simple/price?ids=bitcoin,ethereum,tether,usd-coin,binancecoin&vs_currencies=usd,ngn`),
      fetch(`${COINGECKO_BASE}/simple/price?ids=usd&vs_currencies=ngn`)
    ]);

    const cryptoData = await cryptoResponse.json();
    
    // Get USD/NGN rate from exchangerate.host (free, no key)
    const forexResponse = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=NGN');
    const forexData = await forexResponse.json();
    
    const usdToNgn = forexData.rates?.NGN || 1550; // Fallback rate

    const rates = {
      usdToNgn: usdToNgn,
      ngnToUsd: 1 / usdToNgn,
      crypto: {
        BTC: {
          usd: cryptoData.bitcoin?.usd || 0,
          ngn: cryptoData.bitcoin?.ngn || 0,
          name: 'Bitcoin',
          symbol: 'BTC',
        },
        ETH: {
          usd: cryptoData.ethereum?.usd || 0,
          ngn: cryptoData.ethereum?.ngn || 0,
          name: 'Ethereum',
          symbol: 'ETH',
        },
        USDT: {
          usd: cryptoData.tether?.usd || 1,
          ngn: cryptoData.tether?.ngn || usdToNgn,
          name: 'Tether',
          symbol: 'USDT',
        },
        USDC: {
          usd: cryptoData['usd-coin']?.usd || 1,
          ngn: cryptoData['usd-coin']?.ngn || usdToNgn,
          name: 'USD Coin',
          symbol: 'USDC',
        },
        BNB: {
          usd: cryptoData.binancecoin?.usd || 0,
          ngn: cryptoData.binancecoin?.ngn || 0,
          name: 'BNB',
          symbol: 'BNB',
        },
      },
      lastUpdated: new Date().toISOString(),
    };

    ratesCache = rates;
    lastFetch = now;
    
    return rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    
    // Return fallback rates
    return {
      usdToNgn: 1550,
      ngnToUsd: 0.000645,
      crypto: {
        BTC: { usd: 97000, ngn: 150350000, name: 'Bitcoin', symbol: 'BTC' },
        ETH: { usd: 3200, ngn: 4960000, name: 'Ethereum', symbol: 'ETH' },
        USDT: { usd: 1, ngn: 1550, name: 'Tether', symbol: 'USDT' },
        USDC: { usd: 1, ngn: 1550, name: 'USD Coin', symbol: 'USDC' },
        BNB: { usd: 650, ngn: 1007500, name: 'BNB', symbol: 'BNB' },
      },
      lastUpdated: new Date().toISOString(),
      isFallback: true,
    };
  }
};

// Calculate conversion with 3% fee for amounts over 50,000 NGN
export const calculateConversion = (amount, fromCurrency, toCurrency, rates) => {
  let convertedAmount = 0;
  let fee = 0;
  const FEE_THRESHOLD = 50000; // NGN
  const FEE_PERCENTAGE = 0.03; // 3%

  if (fromCurrency === 'NGN' && toCurrency === 'USD') {
    convertedAmount = amount * rates.ngnToUsd;
    if (amount > FEE_THRESHOLD) {
      fee = amount * FEE_PERCENTAGE;
    }
  } else if (fromCurrency === 'USD' && toCurrency === 'NGN') {
    convertedAmount = amount * rates.usdToNgn;
    const ngnEquivalent = amount * rates.usdToNgn;
    if (ngnEquivalent > FEE_THRESHOLD) {
      fee = ngnEquivalent * FEE_PERCENTAGE;
    }
  } else if (fromCurrency === 'NGN' && rates.crypto[toCurrency]) {
    const crypto = rates.crypto[toCurrency];
    convertedAmount = amount / crypto.ngn;
    if (amount > FEE_THRESHOLD) {
      fee = amount * FEE_PERCENTAGE;
    }
  } else if (rates.crypto[fromCurrency] && toCurrency === 'NGN') {
    const crypto = rates.crypto[fromCurrency];
    convertedAmount = amount * crypto.ngn;
    if (convertedAmount > FEE_THRESHOLD) {
      fee = convertedAmount * FEE_PERCENTAGE;
    }
  }

  return {
    originalAmount: amount,
    convertedAmount: convertedAmount,
    fee: fee,
    feePercentage: fee > 0 ? FEE_PERCENTAGE * 100 : 0,
    finalAmount: convertedAmount - fee,
    fromCurrency,
    toCurrency,
    rate: convertedAmount / amount,
  };
};