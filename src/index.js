import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import store from './reducer/store'
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

