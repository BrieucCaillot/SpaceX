import React, { useEffect } from 'react';

const Rocket = ({rocket}) => {

  useEffect(() => {
    console.log('ROCKET', {rocket})
  }, [])

  // return (
  //   <div>
  //     <p>name : {rocket.rocket_name}</p>
  //     <p>active ? {rocket.active ? 'true' : 'false'}</p>
  //     <img src={rocket.flickr_images} alt={rocket.rocket_name} />
  //   </div>
  // )
}

export default Rocket;
