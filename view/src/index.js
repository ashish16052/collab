import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './reducers/user'
import viewReducer from './reducers/view'
import modalReducer from './reducers/modal'
import projectReducer from './reducers/project'

const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    modal: modalReducer,
    project: projectReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);