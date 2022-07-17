import React from 'react';
import './App.css';
import Header from './components/layout/Header/Header.js';
import Home from './components/Home/Home.js';
import { BrowserRouter as Router, Route, Routes } from  'react-router-dom'; 
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails'
import Products from './components/Product/Products.js';
import Search from './components/Product/Search.js'
import LoginRegister from './components/User/LoginRegister';
import store from './store';
import { loadLoggedInUser } from './actions/userAction';
import UserMenu from './components/layout/Header/UserMenu';
import { useSelector } from 'react-redux';

function App() {

const { isAuthenticated, user } = useSelector(state => state.user);
// TO LOAD THE FONT at componentDidMount
useEffect(() => {
  WebFont.load({
    google: {
      families: ["Montserrat", "Roboto", "Droid Sans"]
    }
  });

  store.dispatch(loadLoggedInUser());

}, []);


  return (
    <Router>
      <Header />
      { isAuthenticated && <UserMenu user={user} /> }
      {/* IN REACT-ROUTER-DOM V6, WE HAVE TO WRAP ALL OUR ROUTE WITHIN ROUTES COMPONENT */}
      <Routes>
      {/* NOW WE HAVE TO USE element={<Component />} instead of earlier component={Component} */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
