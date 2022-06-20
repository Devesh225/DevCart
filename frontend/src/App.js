import './App.css';
import Header from './components/layout/Header/Header.js';
import { BrowserRouter as Router } from  'react-router-dom'; 
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer';

function App() {

// TO LOAD THE FONT at componentDidMount
useEffect(() => {
  WebFont.load({
    google: {
      families: ["Roboto", "Droid Sans"]
    }
  });
}, []);


  return (
    <Router>
      <Header />
      <Footer />
    </Router>

  );
}

export default App;
