import React, { useEffect } from "react";
import { Provider } from 'react-redux'
import { getAllLaunches, getAllRockets } from './store/actions';
import store from './store';
import { GET_ALL_ROCKETS_WITH_LAUNCHES } from './store/actions/types';
import ThreeInit from './views/ThreeInit';
import Rockets from './views/Rockets';
import Grid from './components/three/Grid';

const App = () => {

  useEffect(() => {
    store.dispatch(getAllLaunches()).then(() => {
      store.dispatch(getAllRockets()).then(() => {
        store.dispatch({ type: GET_ALL_ROCKETS_WITH_LAUNCHES })
      })
    })
  }, []);

  return (
    <Provider store={store}>
      <ThreeInit />
      <Grid />
      <Rockets />
    </Provider>
  );
}

export default App;
