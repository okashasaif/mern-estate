import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import "./home.css"
import Navbar from "../../Components/Navbar/Header.jsx";
import Widget from "../../Components/Widget/Widget.jsx";
import Featured from "../../Components/featured/Featured.jsx";
import Chart from "../../Components/chart/Chart.jsx";
import React, { useState, useEffect } from 'react';
import PreloaderComponent from '../../Components/Pre-loader/Pre-loader.jsx';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (


    <div>
    {isLoading ? (
      <PreloaderComponent />
    ) : (
      <div>
           <div className="home">
     <Sidebar/>
     <div className="homeContainer">
      <Navbar/>
      <div className="widgets">
      <Widget/>
      </div>
      <div className="charts">
        <Featured className="feature"/>
        <Chart/>
      </div>
     </div>
    </div>
      </div>
    )}
  </div>
);
};
 


export default Home