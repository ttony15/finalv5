import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatLargeNumber } from '../utils/formatters';

interface RewardDisplayProps {
  estimatedReward: number;
  enkiPrice: number | null;
  ATH_PRICE: number;
}

export function RewardDisplay({ estimatedReward, enkiPrice, ATH_PRICE }: RewardDisplayProps) {
  return (
    <div className="bg-yellow-200 border-l-4 border-yellow-500 p-4 mt-4">
      <p className="text-yellow-800">
        Estimated Reward: <span className="font-bold">{formatLargeNumber(estimatedReward)} ENKI</span>
      </p>
      {enkiPrice !== null && (
        <>
          <p className="text-yellow-800 mt-2">
            Estimated Value: <span className="font-bold">${formatLargeNumber(estimatedReward * enkiPrice)} USD</span>
          </p>
          <p className="text-yellow-800 mt-2">
            Estimated Value at ATH: <span className="font-bold">${formatLargeNumber(estimatedReward * ATH_PRICE)} USD</span>
          </p>
        </>
      )}
      <div className="mt-4">
        <a
          href="https://www.enkixyz.com/defi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-yellow-700 hover:text-yellow-800 transition duration-300"
        >
          How to boost? <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}