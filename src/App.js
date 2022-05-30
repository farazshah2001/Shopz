
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Buy from './pages/Buy';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleItem from './pages/SingleItem';
import Sell from './pages/Sell';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter >
      <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/singleItem" element={<SingleItem />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
