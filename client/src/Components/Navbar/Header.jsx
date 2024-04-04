import "./navbar.scss"
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { DarkModeContext } from "../../context/darkModeContext.jsx";
import { Link} from 'react-router-dom';
import {useSelector } from 'react-redux';
import { useContext } from "react";




const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { dispatch } = useContext(DarkModeContext);
  const handleClick = () => {
    dispatch({ type: 'TOGGLE' });
  };
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search" className="search2"/>
          <SearchIcon className="icon1"/>
        </div>
        <div className="items">
          <div className="item">
          <LanguageIcon className="icon"/>
          English 
          </div>
          <div className="item">
          <NightlightIcon className="icon" onClick={handleClick} />
          </div>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover mr-5'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
