import React from 'react';
import SpaceXLogo from '../assets/images/spacex-logo.svg';

const Header = () => {

  return (
    <div className="header">
      <img src={SpaceXLogo} className="logo" alt="logo"></img>
    </div>
  )
}

export default Header;
