import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Panel from './components/Panel';
import Footer from './components/Footer';
import Home from './pages/Home';

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/articles" component={Home} />
      </Switch>
    </div>
  </Router>;

export default App;
