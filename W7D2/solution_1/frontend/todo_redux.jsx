import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = localStorage.state ?
    JSON.parse(localStorage.state) : {};
  const store = configureStore(preloadedState);

  // const addLoggingToDispatch = (store) => {
  //   let dispatchFunc = store.dispatch;
  //   return (action) => {
  //     console.log(store.getState());
  //     console.log(action);
  //     console.log(dispatchFunc(action));
  //     console.log(store.getState());
  //   }
  // }
  //
  // store.dispatch = addLoggingToDispatch(store);

  // const dispatch = store.dispatch;
  //
  // const addLoggingToDispatch = store => next => action => {
  //   console.log(store.getState());
  //   console.log(action);
  //   next(action);
  //   console.log(store.getState());
  // }

  const applyMiddlewares = (store, ...middlewares) => {
    let dispatch = store.dispatch;
    middlewares.forEach( (middleware) => {
      dispatch = middleware(store)(dispatch);
    })
    return Object.assign( {}, store, { dispatch });
  }

  const root = document.getElementById('content');
  ReactDOM.render(<Root store={store} />, root);
});