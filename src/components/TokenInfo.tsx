import React from 'react';
import { Info } from 'lucide-react';

interface TokenInfoProps {
  hardCap: string;
  tokenPrice: string;
  minPurchase: string;
  maxPurchase: string;
}

function TokenInfo({ hardCap, tokenPrice, minPurchase, maxPurchase }: TokenInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-400" />
        <span className="font-medium">Token Information</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Hard Cap', value: hardCap },
          { label: 'Token Price', value: tokenPrice },
          { label: 'Min Purchase', value: minPurchase },
          { label: 'Max Purchase', value: maxPurchase },
        ].map((item, index) => (
          <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
            <div className="text-sm text-slate-400">{item.label}</div>
            <div className="font-medium">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenInfo;