import React, { useEffect} from "react";
import Home from './views/Home';
import { Provider } from 'react-redux'
import { getAllLaunches, getAllRockets } from './store/actions';
import store from './store';
import { GET_ALL_ROCKETS_WITH_LAUNCHES } from './store/actions/types';

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
      <Home />
    </Provider>
  );
}

export default App;
