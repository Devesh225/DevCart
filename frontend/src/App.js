import './App.css';
import Header from './components/layout/Header/Header.js';
import Home from './components/Home/Home.js';
import { BrowserRouter as Router, Route } from  'react-router-dom'; 
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer';

function App() {

// TO LOAD THE FONT at componentDidMount
useEffect(() => {
  WebFont.load({
    google: {
      families: ["Montserrat", "Roboto", "Droid Sans"]
    }
  });
}, []);


  return (
    <Router>
      <Header />
      <Route exact path="/" component={ Home } />
      <Footer />
    </Router>

  );
}

export default App;
