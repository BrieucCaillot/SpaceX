import React, { useState } from 'react';
import formatter from 'format-number';

const RocketDescription = ({ rocket, rocketSection }) => {

  const [showDescription, setShowDescription] = useState(false)

  rocketSection.onClick = () => {
    setShowDescription(!showDescription)
  }

  const rocketLaunchSuccess = (launchSuccess) => {
    let rocketLaunchClass = null;
    let rocketLaunchContent = null;
    switch (launchSuccess) {
      case true:
        rocketLaunchClass = 'success'
        rocketLaunchContent = 'Success'
        break;
      case false:
        rocketLaunchClass = 'fail'
        rocketLaunchContent = 'Fail'
        break;
      case null:
        rocketLaunchClass = 'incoming'
        rocketLaunchContent = 'Incoming'
        break;
    }
    return (
      <h3 className={rocketLaunchClass}>
        {rocketLaunchContent}
      </h3>
    )
  }

  if (showDescription) {
    return (
      <>
        <div className="rocket__about rocket__about__left">
          <div className="rocket__about__section">
            <h2>Description</h2>
            <p>{rocket.description}</p>
          </div>
          <div className="rocket__about__section">
            <h2>Active</h2>
            <p>{rocket.active ? "Yes" : "No"}</p>
          </div>
          <div className="rocket__about__section">
            <h2>Cost per launch</h2>
            <p>{formatter({suffix: ' $'})(rocket.cost_per_launch)}</p>
          </div>
          <div className="rocket__about__section">
            <h2>First flight</h2>
            <p>{rocket.first_flight}</p>
          </div>
        </div>
        <div className="rocket__about rocket__about__right">
          <h2>Missions</h2>
          {rocket.launches.map((launch, index) => {
            return (
              <div key={index}>
                <div key={index} className="rocket__about__right__launch">
                  <div className="rocket__about__section">
                    <h2>{launch.mission_name}</h2>
                    <p>{launch.launch_year}</p>
                    {rocketLaunchSuccess(launch.launch_success)}
                    {launch.launch_failure_details && <p>{launch.launch_failure_details.reason}</p>}
                  </div>
                  {launch.details &&
                  <div className="rocket__about__section">
                    <h3>Details</h3>
                    <p>{launch.details}</p>
                  </div>}
                </div>
              </div>
            )
          })}
        </div>
      </>
    )
  } else {
    return null
  }

}

export default RocketDescription;
