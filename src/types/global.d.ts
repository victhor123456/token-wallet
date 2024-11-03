interface Window {
  ethereum?: any;
  solana?: {
    isPhantom?: boolean;
    connect(): Promise<{ publicKey: { toString(): string } }>;
    disconnect(): Promise<void>;
    publicKey: { toString(): string };
  };
  solflare?: {
    isSolflare?: boolean;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publicKey: { toString(): string };
  };
}