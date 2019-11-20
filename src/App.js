import React, { useEffect } from "react";
import { Provider } from 'react-redux'

import store from './store';
import { GET_ALL_ROCKETS_WITH_LAUNCHES } from './store/actions/types';
import { getAllLaunches, getAllRockets } from './store/actions';

import RocketsMuseum from './views/RocketsMuseum';
import app from './scss/app.scss';

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
        <RocketsMuseum />
    </Provider>
  );
}

export default App;
