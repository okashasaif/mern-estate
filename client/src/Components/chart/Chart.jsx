import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const FirebaseGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      databaseURL: 'https://mernestate-cfe13-default-rtdb.firebaseio.com/',
    };
    const app = initializeApp(firebaseConfig);

    // Get a reference to the database
    const database = getDatabase(app);
    const databaseRef = ref(database);

    // Listen for changes to the data
    const unsubscribe = onValue(databaseRef, (snapshot) => {
      const val = snapshot.val();
      const formattedData = Object.keys(val).map((key) => ({
        name: key,
        value: parseFloat(val[key]),
      }));
      setData(formattedData);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Find the minimum and maximum values in the data
  const minValue = Math.min(...data.map((entry) => entry.value));
  const maxValue = Math.max(...data.map((entry) => entry.value));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-0 ml-7 text-slate-600">Energy Management System</h1>
      <div className="chart-container">
        <BarChart width={700} height={350} data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }}>
  <label value="Current" position="insideBottom" offset={-10}>
    Current
  </label>
  <label value="Power" position="insideBottom" offset={-10}>
    Power
  </label>
  <label value="Remaining Energy" position="insideBottom" offset={-10}>
    Remaining Energy
  </label>
  <label value="Solar" position="insideBottom" offset={-10}>
    Solar
  </label>
  <label value="Solar Energy" position="insideBottom" offset={-10}>
    Solar Energy
  </label>
  <label value="Total Energy" position="insideBottom" offset={-10}>
    Total Energy
  </label>
  <label value="Voltage" position="insideBottom" offset={-10}>
    Voltage
  </label>
</XAxis>
          <YAxis
            type="number"
            domain={[minValue - 1, maxValue + 1]} // Adjust the domain to include all values
            allowDataOverflow={true} // Allow data overflow to show all bars
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#2D3748" className='fill-slate-700' />
        </BarChart>
      </div>
    </div>
  );
};

export default FirebaseGraph;