import { useState, useEffect } from 'react';

const useMockEnergyMeterData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate data updates every 2 seconds
    const interval = setInterval(() => {
      // Generate mock data
      const mockData = {
        unitsConsumed: Math.floor(Math.random() * 1000),
        unitsLeft: Math.floor(Math.random() * 500),
        unitsConsumedThisMonth: Math.floor(Math.random() * 200),
        unitsConsumedYearly: Math.floor(Math.random() * 5000),
      };

      setData(mockData);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

export default useMockEnergyMeterData;