import React, { useEffect, useState } from 'react';

const RocketDescription = ({ rocket, rocketSection }) => {

  const [showDescription, setShowDescription] = useState(false)

  const onClick = () => {
  }
  rocketSection.onClick = () => {
    setShowDescription(!showDescription)
  }

  if (showDescription) {
    return (
      <>
        <div className="rocket__about rocket__about__left">
          <div className="rocket__about__section">
            <h2>Description</h2>
            <p className="">{rocket.description}</p>
          </div>
          <div className="rocket__about__section">
            <h2>Active</h2>
            <p className="">{rocket.active ? "Yes" : "No"}</p>
          </div>
          <div className="rocket__about__section">
            <h2>Cost per launch</h2>
            <p className="">{rocket.cost_per_launch + ' $'}</p>
          </div>
          <div className="rocket__about__section">
            <h2>First flight</h2>
            <p className="">{rocket.first_flight}</p>
          </div>
        </div>
        <div className="rocket__about rocket__about__right">
          {rocket.launches.map((launch, index) => {
            console.log(launch)
            return (
              <>
                <div key={index} className="rocket__about__right__launch">
                  <div className="rocket__about__section">
                    <h2>{launch.mission_name}</h2>
                    <p>{launch.launch_year}</p>
                    <h3 className={launch.launch_success ? "success" : "fail"}>
                      {launch.launch_success ? "Success" : "Fail"}
                    </h3>
                    <p>{launch.launch_failure_details ? launch.launch_failure_details.reason : null}</p>
                  </div>
                  <div className="rocket__about__section">
                    <h3>Details</h3>
                    <p>{launch.details ? launch.details : "No details"}</p>
                  </div>
                </div>
              </>
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
