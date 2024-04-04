
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Navbar from "../../Components/Navbar/Header.jsx";
import Table from "../../Components/table/Table.jsx";
import "./list.scss"
import { useState } from "react";
import React, { useEffect } from 'react';
import PreloaderComponent from '../../Components/Pre-loader/Pre-loader.jsx';

const List = () => {
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
            <div className="new">
    <Sidebar/>
    <div className="newContainer">
    <Navbar/>
    <div className="listContainer">
          <div className="listTitle">USERS
          </div>
          <Table/>
        </div>
    </div>
    </div>
      </div>
    )}
  </div>



  )
}
export default List;

