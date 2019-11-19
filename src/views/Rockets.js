import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Rocket from '../components/Rocket';

const Rockets = ({ allRockets, allLaunches }) => {

  // group launches by rockets
  const [launchesByRockets, setLaunchesByRockets] = useState([]);
  useEffect(() => {

    if (allLaunches.length > 0) {
      let arr = allLaunches.reduce((r, a) => {
        r[a.rocket.rocket_id] = r[a.rocket.rocket_id] || [];
        r[a.rocket.rocket_id].push(a);
        return r;
      }, []);
      setLaunchesByRockets(arr)
    }

  }, [allLaunches])


  // group rockets with launches
  const [rockets, setRockets] = useState([]);
  useEffect(() => {

    if (launchesByRockets &&
      allRockets.length > 0) {

      for (let rocket of allRockets) {
        rocket['launches'] = []
        for (let launch of allLaunches) {
          if (rocket.rocket_id === launch.rocket.rocket_id) {
            rocket.launches.push(launch)
          }
        }
      }

      setRockets(allRockets)
    }

  }, [launchesByRockets, allRockets])

  useEffect(() => {
    console.log(rockets.length)
  }, [rockets])

  return (
    <>
      {rockets.map((rocket, index) => (
        <Rocket key={index} {...rocket} />
      ))
      }
    </>
  )
}

const mapStateToProps = (state) => {
  const { allRockets } = state.RocketsReducer;
  const { allLaunches } = state.LaunchesReducer;
  return { allRockets, allLaunches };
};


export default connect(mapStateToProps)(Rockets);
