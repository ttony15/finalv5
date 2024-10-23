import React from 'react';
import { HelpCircle } from 'lucide-react';

interface StakingGuideProps {
  showGuide: boolean;
  setShowGuide: (show: boolean) => void;
}

export function StakingGuide({ showGuide, setShowGuide }: StakingGuideProps) {
  return (
    <div className="mt-8">
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="text-yellow-600 hover:text-yellow-700 underline flex items-center"
      >
        <HelpCircle className="w-4 h-4 mr-1" />
        How to find your staking points
      </button>
      {showGuide && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-2">
          <h4 className="text-lg font-semibold text-yellow-800 mb-2">How to find your staking points:</h4>
          <ol className="list-decimal list-inside text-yellow-700">
            <li>Go to <a href="https://www.enkixyz.com/portfolio" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">https://www.enkixyz.com/portfolio</a></li>
            <li>Connect your MetisL2 wallet</li>
            <li>Find your staking points under "Staking Rewards"</li>
          </ol>
        </div>
      )}
    </div>
  );
}