import './App.css';
import Header from './components/layout/Header.js';
import { BrowserRouter as Router } from  'react-router-dom'; 
import WebFont from 'webfontloader';
import { useEffect } from 'react';

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
    </Router>

  );
}

export default App;
