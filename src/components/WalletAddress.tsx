import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

function WalletAddress() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">Token Contract Address</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="font-mono text-sm break-all bg-slate-800 p-3 rounded">
        {walletAddress}
      </div>
    </div>
  );
}

export default WalletAddress;