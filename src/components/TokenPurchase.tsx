import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface TokenPurchaseProps {
  selectedPayment: string;
}

function TokenPurchase({ selectedPayment }: TokenPurchaseProps) {
  const [amount, setAmount] = useState('');
  const tokenPrice = 0.1; // USDT per token

  const calculateTokens = () => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount / tokenPrice).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          Amount to Invest
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {selectedPayment.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 bg-slate-700/50 p-3 rounded-lg">
          <div className="text-sm text-slate-400">You will receive</div>
          <div className="font-medium">{calculateTokens()} Tokens</div>
        </div>
        <ArrowRight className="w-6 h-6 text-slate-500" />
      </div>

      <button 
        className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-lg font-medium transition"
        onClick={() => alert('Purchase functionality would be implemented here')}
      >
        Buy Tokens
      </button>

      <p className="text-sm text-slate-400 text-center">
        By clicking "Buy Tokens" you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}

export default TokenPurchase;