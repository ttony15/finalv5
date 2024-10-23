import React, { useState } from 'react';
import { Calculator, Loader } from 'lucide-react';
import { formatLargeNumber } from '../utils/formatters';

interface StakingCalculatorProps {
  onSubmit: (address: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function StakingCalculator({ onSubmit, isLoading, error }: StakingCalculatorProps) {
  const [userAddress, setUserAddress] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userAddress) {
      onSubmit(userAddress);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label htmlFor="userAddress" className="block text-sm font-medium text-yellow-700 mb-1">
            Your MetisL2 Wallet Address
          </label>
          <input
            type="text"
            id="userAddress"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100"
            placeholder="Enter your MetisL2 wallet address"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-300 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Calculator className="w-5 h-5 mr-2" />}
          {isLoading ? 'Fetching...' : 'Fetch Staking Points'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}