import React, { Component } from 'react';
import Customerlist from './component/Customerlist';
import Trainings from './component/Trainings';
import './App.css';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <nav>
        <Link to="/customer">Customer list</Link>
        <Link to="/training">Trainings</Link>
      </nav>
        <Route path="/customer" exact component={Customerlist} />
        <Route path="/training" component={Trainings} />
         
       
      
      </div>
      </Router>
    );
    
  }
}

export default App;
