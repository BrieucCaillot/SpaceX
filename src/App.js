import React, {useEffect} from "react";
import Home from './views/Home';
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
      <Home />
    </Provider>
  );
}

export default App;
