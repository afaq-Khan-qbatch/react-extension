import React from 'react';
import './App.css';
import NavBar from './nav';
import dashboard from './dashboard';
import { Route, Switch } from 'react-router-dom'
import Cart from './cart';
import Error from './Error';
import SignIn from './singin';
import SignUp from './signUp';
import Stripe from './stripeExample';

function App() {

  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/cart' component={Cart} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/stripe' component={Stripe} />
        <Route path='/' component={dashboard} />
        <Route component={Error} />
      </Switch>

    </>
  )
}

export default App;
