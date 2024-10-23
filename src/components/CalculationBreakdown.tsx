import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatLargeNumber } from '../utils/formatters';

interface CalculationBreakdownProps {
  showCalculations: boolean;
  setShowCalculations: (show: boolean) => void;
  stakingPoints: string;
  totalStakingPoints: number;
  TOTAL_ENKI_AIRDROP: number;
  estimatedReward: number;
  enkiPrice: number | null;
  ATH_PRICE: number;
}

export function CalculationBreakdown({
  showCalculations,
  setShowCalculations,
  stakingPoints,
  totalStakingPoints,
  TOTAL_ENKI_AIRDROP,
  estimatedReward,
  enkiPrice,
  ATH_PRICE,
}: CalculationBreakdownProps) {
  return (
    <>
      <button
        onClick={() => setShowCalculations(!showCalculations)}
        className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-300 mt-4"
      >
        {showCalculations ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
        {showCalculations ? 'Hide Calculations' : 'Show Calculations'}
      </button>
      {showCalculations && (
        <div className="bg-yellow-100 p-4 rounded-md mt-2">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Calculation Breakdown</h3>
          <p className="text-sm text-yellow-700 mb-1">
            Your Staking Points: {formatLargeNumber(parseFloat(stakingPoints))}
          </p>
          <p className="text-sm text-yellow-700 mb-1">
            Total Staking Points: {formatLargeNumber(totalStakingPoints)}
          </p>
          <p className="text-sm text-yellow-700 mb-1">
            Total ENKI Airdrop: {TOTAL_ENKI_AIRDROP.toLocaleString()} ENKI
          </p>
          <p className="text-sm text-yellow-700 mb-1">
            Formula: (Your Staking Points / Total Staking Points) × Total ENKI Airdrop
          </p>
          <p className="text-sm text-yellow-700">
            Calculation: ({formatLargeNumber(parseFloat(stakingPoints))} / {formatLargeNumber(totalStakingPoints)}) × {TOTAL_ENKI_AIRDROP.toLocaleString()} = {formatLargeNumber(estimatedReward)} ENKI
          </p>
          {enkiPrice !== null && (
            <>
              <p className="text-sm text-yellow-700 mt-1">
                USD Value: {formatLargeNumber(estimatedReward)} ENKI × ${enkiPrice.toFixed(4)} = ${formatLargeNumber(estimatedReward * enkiPrice)} USD
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                USD Value at ATH: {formatLargeNumber(estimatedReward)} ENKI × ${ATH_PRICE.toFixed(2)} = ${formatLargeNumber(estimatedReward * ATH_PRICE)} USD
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}