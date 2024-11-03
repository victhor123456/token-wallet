import React, { useState } from 'react';
import { Coins, CreditCard, Timer, Wallet, Shield, ChevronDown, ExternalLink } from 'lucide-react';
import TokenPurchase from './components/TokenPurchase';
import CountdownTimer from './components/CountdownTimer';
import TokenInfo from './components/TokenInfo';
import WalletAddress from './components/WalletAddress';
import WalletConnect from './components/WalletConnect';

function App() {
  const [selectedPayment, setSelectedPayment] = useState('usdt');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">CryptoToken</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-blue-400 transition">Whitepaper</a>
            <a href="#" className="hover:text-blue-400 transition">Audit</a>
            <WalletConnect />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Join the Future of <span className="text-blue-400">Decentralized Finance</span>
          </h1>
          <p className="text-lg text-slate-300">
            Participate in our token presale and be part of the next generation blockchain revolution.
            Early investors get special bonuses!
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Shield className="text-green-400 w-5 h-5" />
              <span className="text-sm">Audited</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
              <Timer className="text-yellow-400 w-5 h-5" />
              <span className="text-sm">Limited Time</span>
            </div>
          </div>
          <WalletAddress />
        </div>

        {/* Purchase Card */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="space-y-6">
            <CountdownTimer endDate="2024-04-30T00:00:00" />
            
            <TokenInfo 
              hardCap="5,000,000 USDT"
              tokenPrice="0.1 USDT"
              minPurchase="100 USDT"
              maxPurchase="50,000 USDT"
            />

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'usdt', name: 'USDT', icon: Coins },
                  { id: 'usdc', name: 'USDC', icon: Coins },
                  { id: 'sol', name: 'Solana', icon: Wallet },
                  { id: 'card', name: 'Card', icon: CreditCard },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span>{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <TokenPurchase selectedPayment={selectedPayment} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Secure Transactions',
              description: 'Multiple security audits and secure payment processing',
              icon: Shield,
            },
            {
              title: 'Multiple Payment Options',
              description: 'Pay with USDT, USDC, Solana, or credit card',
              icon: Wallet,
            },
            {
              title: 'Instant Delivery',
              description: 'Tokens are automatically sent to your wallet',
              icon: ExternalLink,
            },
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6 space-y-4">
              <feature.icon className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;