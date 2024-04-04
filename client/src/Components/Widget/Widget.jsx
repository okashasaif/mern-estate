import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const FirebaseData = () => {
  const [data, setData] = useState({});

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
      setData(snapshot.val());
    }, (error) => {
      console.error("Error fetching data:", error);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  if(!data){
    <div>loading....</div>
  }

  return (
    <div className="flex justify-center p-1 mx-3 my-1">

<div className="bg-gray-200 p-8 m-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
  <p className="text-xl font-semibold text-slate-600">POWER</p>
  <span className="text-xl font-semibold text-red-800">{data.Power}</span>
</div>

<div className="bg-gray-200 p-8 m-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
  <p className="text-xl font-semibold text-slate-600">UNITS LEFT</p>
  <span className="text-xl font-semibold text-red-800">{data[`Remaining Energy`]} UNITS</span>
</div>

<div className="bg-gray-200 p-8 m-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
  <p className="text-xl font-semibold text-slate-600">ENERGY PRDUCED BY SOLAR</p>
  <span className="text-xl font-semibold text-green-700">{data[`Solar Energy`]} W</span>
</div>

<div className="bg-gray-200 p-8 m-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
  <p className="text-xl font-semibold text-slate-600">TOTAL ENERGY</p>
  <span className="text-xl font-semibold text-red-800">{data[`Total Energy`]} W</span>
</div>

      </div>
  );
};

export default FirebaseData;

// import React, { useEffect, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, onValue } from 'firebase/database';

// const HorizontalBoxes  = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     // Initialize Firebase
//     const firebaseConfig = {
//       apiKey: "AIzaSyAl_FI32mkpjZytBRxTfZkvwyQHbMnIOuU",
//       authDomain: "mernestate-cfe13.firebaseapp.com",
//       projectId: "mernestate-cfe13",
//       storageBucket: "mernestate-cfe13.appspot.com",
//       messagingSenderId: "877759915803",
//       appId: "1:877759915803:web:d25fc8d7a578be3a6fd5be",
//       measurementId: "G-SV64CW5L72",
//       database: 'https://mernestate-cfe13-default-rtdb.firebaseio.com/',
//     };
//     const app = initializeApp(firebaseConfig);
  
//     // Get a reference to the database
//     const database = getDatabase(app);
//     const databaseRef = ref(database);
  
//     // Listen for changes to the data
//     const unsubscribe = onValue(databaseRef, (snapshot) => {
//       setData(snapshot.val());
//     });
  
//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

    

 
//   return (

//   );
// };
// export default HorizontalBoxes;