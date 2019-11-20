import React, { useEffect } from 'react';
import SpaceXLogo from '../assets/images/spaceXLogo.png';

const Header = () => {

  useEffect(() => {
    console.log('header')
  }, [])

  return (
    <div className="header">
      <img src={SpaceXLogo} className="logo" alt="logo"></img>
    </div>
  )
}

export default Header;
