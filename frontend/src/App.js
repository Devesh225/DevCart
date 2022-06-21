import './App.css';
import Header from './components/layout/Header/Header.js';
import Home from './components/Home/Home.js';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'; 
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
      {/* IN REACT-ROUTER-DOM V6, WE HAVE TO WRAP ALL OUR ROUTE WITHIN ROUTES COMPONENT */}
      <Routes>
      {/* NOW WE HAVE TO USE element={<Component />} instead of earlier component={Component} */}
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
