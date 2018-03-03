import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import { Container } from './components/Grid';
import Saved from './pages/Saved';
import Search from './pages/Search';
import Home from './pages/Home';

const App = () =>
  <Router>
    <Container>
    <Nav />
    <Switch>
      <Route path="/:saved" component={Saved} />
      <Route path="/" component={Search} />
    </Switch>
  </Container>
  </Router>;

export default App;
