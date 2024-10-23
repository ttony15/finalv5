const API_URL = 'https://prod.api.enkixyz.com/';

interface StakingPointsResponse {
  data?: {
    globalStakingPoints?: {
      points: number;
    };
    stakingPoints?: {
      points: number;
    };
  };
  errors?: Array<{ message: string }>;
}

export async function fetchGlobalStakingPoints(): Promise<number> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            globalStakingPoints {
              points
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: StakingPointsResponse = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    if (!data.data?.globalStakingPoints?.points) {
      throw new Error('Invalid response format');
    }

    return data.data.globalStakingPoints.points;
  } catch (error) {
    console.error('Error fetching global staking points:', error);
    return 2.68e9; // Fallback value if API fails
  }
}

export async function fetchUserStakingPoints(address: string): Promise<number> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ($user: String!) {
          stakingPoints(user: $user) {
            points
          }
        }
      `,
      variables: {
        user: address,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: StakingPointsResponse = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  if (!data.data?.stakingPoints?.points) {
    throw new Error('No staking points found for this address');
  }

  return data.data.stakingPoints.points;
}