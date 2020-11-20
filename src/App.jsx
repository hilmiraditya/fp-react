import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import ProfilePage from './Page/ProfilePage/ProfilePage';
import './App.css';
import TransactionPage from './Page/TransactionPage/TransactionPage';
import Navigation from './component/Navigation';
import Footer from './component/Footer';
import LoginPage from './Page/LoginPage/LoginPage';
import { getToken } from './service/SessionStorage';

export default function App() {
  return (
    <div>
      {getToken() === null ? <Redirect to={{ pathname: '/' }} /> : <Navigation />}
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/transaction">
          <TransactionPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
