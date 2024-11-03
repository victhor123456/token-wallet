import React, { useState, useEffect } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { ethers } from 'ethers';
import { Connection } from '@solana/web3.js';

interface WalletState {
  connected: boolean;
  address: string;
  chainId?: string;
  balance?: string;
  type?: 'metamask' | 'phantom' | 'solflare';
}

const WalletConnect: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: '',
  });
  const [error, setError] = useState<string>('');

  const resetState = () => {
    setWalletState({
      connected: false,
      address: '',
    });
    setError('');
  };

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const chainId = await provider.send("eth_chainId", []);
      const balance = ethers.formatEther(await provider.getBalance(address));

      setWalletState({
        connected: true,
        address,
        chainId,
        balance,
        type: 'metamask',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to MetaMask');
    }
  };

  const connectPhantom = async () => {
    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error('Phantom wallet is not installed');
      }

      const resp = await window.solana.connect();
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const balance = await connection.getBalance(resp.publicKey);

      setWalletState({
        connected: true,
        address: resp.publicKey.toString(),
        balance: (balance / 1e9).toFixed(4),
        type: 'phantom',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Phantom');
    }
  };

  const connectSolflare = async () => {
    try {
      if (!window.solflare || !window.solflare.isSolflare) {
        throw new Error('Solflare wallet is not installed');
      }

      await window.solflare.connect();
      const connection = new Connection('https://api.mainnet-beta.solana.com');
      const publicKey = window.solflare.publicKey;
      const balance = await connection.getBalance(publicKey);

      setWalletState({
        connected: true,
        address: publicKey.toString(),
        balance: (balance / 1e9).toFixed(4),
        type: 'solflare',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Solflare');
    }
  };

  const disconnectWallet = () => {
    if (walletState.type === 'phantom' && window.solana) {
      window.solana.disconnect();
    } else if (walletState.type === 'solflare' && window.solflare) {
      window.solflare.disconnect();
    }
    resetState();
  };

  useEffect(() => {
    const handleAccountsChanged = () => {
      resetState();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleAccountsChanged);
      }
    };
  }, []);

  if (walletState.connected) {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-sm font-medium">
            {walletState.address.slice(0, 6)}...{walletState.address.slice(-4)}
          </span>
          {walletState.balance && (
            <span className="text-sm text-slate-400">
              ({walletState.balance} {walletState.type === 'metamask' ? 'ETH' : 'SOL'})
            </span>
          )}
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <button
          onClick={connectMetaMask}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium transition"
        >
          <img
            src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/metamask-fox.svg"
            alt="MetaMask"
            className="w-5 h-5"
          />
          Connect MetaMask
        </button>
        <button
          onClick={connectPhantom}
          className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-medium transition"
        >
          <img
            src="https://www.phantom.app/img/logo.png"
            alt="Phantom"
            className="w-5 h-5"
          />
          Connect Phantom
        </button>
        <button
          onClick={connectSolflare}
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition"
        >
          <Wallet className="w-5 h-5" />
          Connect Solflare
        </button>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;