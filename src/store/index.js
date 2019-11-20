import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';

const enhancer = applyMiddleware(thunk)

const store = createStore(
  reducers,
  enhancer
);

// setInterval(() => {
//   console.log(store.getState().ThreeReducer.rocketSections)
// }, 2000)

export default store;
