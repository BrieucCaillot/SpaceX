import React, {useEffect} from "react";
import Rockets from './views/Rockets';
import { Provider } from 'react-redux'
import { getAllLaunches, getAllRockets } from './store/actions';
import store from './store';

const App = () => {

  useEffect(() => {
    store.dispatch(getAllLaunches())
    store.dispatch(getAllRockets())
  }, []);

  return (
    <Provider store={store}>
      <Rockets />
    </Provider>
  );
}

export default App;
