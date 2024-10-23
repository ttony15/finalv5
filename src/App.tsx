import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StakingCalculator } from './components/StakingCalculator';
import { RewardDisplay } from './components/RewardDisplay';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { StakingGuide } from './components/StakingGuide';
import { fetchGlobalStakingPoints, fetchUserStakingPoints } from './utils/api';

const TOTAL_ENKI_AIRDROP = 400000; // 400,000 ENKI
const ATH_PRICE = 18.38; // All-time high price in USD

function App() {
  const [stakingPoints, setStakingPoints] = useState<string>('');
  const [estimatedReward, setEstimatedReward] = useState<number | null>(null);
  const [showCalculations, setShowCalculations] = useState(false);
  const [enkiPrice, setEnkiPrice] = useState<number | null>(null);
  const [totalStakingPoints, setTotalStakingPoints] = useState<number>(2.68e9);
  const [showGuide, setShowGuide] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchEnkiPrice();
    initializeGlobalStakingPoints();
  }, []);

  const initializeGlobalStakingPoints = async () => {
    const points = await fetchGlobalStakingPoints();
    setTotalStakingPoints(points);
  };

  const fetchEnkiPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=enki-protocol&vs_currencies=usd');
      const data = await response.json();
      setEnkiPrice(data['enki-protocol'].usd);
    } catch (error) {
      console.error('Error fetching ENKI price:', error);
    }
  };

  const handleUserStakingPoints = async (address: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const points = await fetchUserStakingPoints(address);
      setStakingPoints(points.toString());
      calculateReward(points.toString());
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching staking points');
      setStakingPoints('');
      setEstimatedReward(null);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateReward = (points: string) => {
    const numPoints = parseFloat(points);
    if (!isNaN(numPoints) && numPoints > 0) {
      const reward = (numPoints / totalStakingPoints) * TOTAL_ENKI_AIRDROP;
      setEstimatedReward(reward);
    } else {
      setEstimatedReward(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 flex items-center justify-center p-4">
      <div className="bg-yellow-50 rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-yellow-800 text-center mb-2">ENKI Staking Rewards Calculator</h1>
          <p className="text-yellow-600 text-center">Estimate your ENKI airdrop rewards based on your staking points</p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2 mt-1" />
            <p className="text-yellow-700">
              <strong>Caution:</strong> This is a community tool and not officially affiliated with ENKI. All calculations are estimates and may not reflect the final airdrop amounts.
            </p>
          </div>
        </div>

        <StakingCalculator
          onSubmit={handleUserStakingPoints}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-6 space-y-2">
          <p className="text-sm text-yellow-700">
            Total Staking Points: <span className="font-semibold">{totalStakingPoints.toLocaleString()} ~</span>
          </p>
          <p className="text-sm text-yellow-700">
            Total ENKI Airdrop: <span className="font-semibold">{TOTAL_ENKI_AIRDROP.toLocaleString()} ENKI</span>
          </p>
          {enkiPrice !== null && (
            <p className="text-sm text-yellow-700">
              Current ENKI Price: <span className="font-semibold">${enkiPrice.toFixed(4)} USD</span>
            </p>
          )}
          
          {estimatedReward !== null && (
            <RewardDisplay
              estimatedReward={estimatedReward}
              enkiPrice={enkiPrice}
              ATH_PRICE={ATH_PRICE}
            />
          )}

          {estimatedReward !== null && (
            <CalculationBreakdown
              showCalculations={showCalculations}
              setShowCalculations={setShowCalculations}
              stakingPoints={stakingPoints}
              totalStakingPoints={totalStakingPoints}
              TOTAL_ENKI_AIRDROP={TOTAL_ENKI_AIRDROP}
              estimatedReward={estimatedReward}
              enkiPrice={enkiPrice}
              ATH_PRICE={ATH_PRICE}
            />
          )}
        </div>

        <StakingGuide
          showGuide={showGuide}
          setShowGuide={setShowGuide}
        />
      </div>
    </div>
  );
}

export default App;