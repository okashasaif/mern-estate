import "./featured1.css"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const Featured = () => {
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
    

    if (!data) {
      return <div>Loading your data.......................</div>;
    }
  return (
    <div className="featured h-50 w-80">
    <div className="top">
      <h1 className="text-slate-500" >UNITS PRODUCE FORM SOLAR ENERGY</h1>
    </div>
    <div className="bottom ml-3">
      <div className="featuredChart mt-5">
      <CircularProgressbar className="gradient-progress" styles={{
    path: {
      stroke: '#2D3748', // Blue color
    },text: {
      fill: ' #2D3748', // Red color
    },
   
  }} value={100} text={data[`Solar Energy`]} strokeWidth={7} />
      </div>
      <p className="pt-5 text-slate-500 text-lg font-bold">SOLAR UNITS</p>
      <p className="amount"></p>
      <div className="summary">
        <div className="item">
          <div className="text-slate-500 font-bold mr-5">CURRENT</div>
          <div className="itemResult">
            <div className="font-bold text-lg text-red-500">{data.Current} A</div>
          </div>
        </div>
        
        <div className="item">
          <div className=" text-slate-500 font-bold mr-5">VOLATGES</div>
          <div className="itemResult">
            <div className="font-bold text-lg text-red-500">{data.Voltage} V</div>
          </div>
        </div>
        <div className="item">
          <div className="text-slate-500 font-bold">POWER</div>
          <div className="itemResult">
            <div className="font-bold text-lg text-red-500">{data.Power}</div>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}
export default Featured
