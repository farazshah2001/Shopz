
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Buy from './pages/Buy';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleItem from './pages/SingleItem';
import Sell from './pages/Sell';
import Profile from './pages/Profile';
function App() {
  return (
    <Router >
      <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/profile"><Profile /></Route>
            <Route path="/signup"><Signup /></Route>
            <Route path="/singleItem"><SingleItem /></Route>
            <Route path="/buy"><Buy /></Route>
            <Route path="/sell"><Sell /></Route>
      </Switch>
    </Router>
  );
}

export default App;
