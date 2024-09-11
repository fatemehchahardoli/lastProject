import React from 'react'
import { Routes, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/Store'
import Home from './components/Home';
import Book from './components/Book';
import Checkout from './components/Checkout';
import Login from './components/Login';
import PrivateRoute from "./components/PrivateRoute";

import './style/Style.scss'


function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book' element={<Book />} />
        <Route element={<PrivateRoute />}>
          <Route path='/checkout' element={<Checkout />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
