import React, {useState} from 'react';
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
import Profile from './components/User/Profile';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import axios from "axios";
import Payment from './components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess'
import ViewMyOrders from './components/Order/ViewMyOrders'
import OrderDetails from './components/Order/OrderDetails'

function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  // TO LOAD THE FONT at componentDidMount
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat"]
      }
    });

    store.dispatch(loadLoggedInUser());
    getStripeApiKey();
    
  }, []);

  return (
    <Router>
      <Header />
      { isAuthenticated && <UserMenu user={user} /> }
      {/* IN REACT-ROUTER-DOM V6, WE HAVE TO WRAP ALL OUR ROUTES WITHIN ROUTES COMPONENT */}
      <Routes>
      {/* NOW WE HAVE TO USE element={<Component />} instead of earlier component={Component} */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route path="/account" element={<ProtectedRoute />}>
          <Route exact path="/account" element={<Profile />} />
        </Route>
        <Route exact path="/login" element={<LoginRegister />} />
        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route exact path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/success" element={<ProtectedRoute />}>
          <Route exact path="/success" element={<OrderSuccess />} />
        </Route>
        <Route path="/orders" element={<ProtectedRoute />}>
          <Route exact path="/orders" element={<ViewMyOrders />} />
        </Route>
        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route path="/process/payment" element={<ProtectedRoute />}>
        { stripeApiKey && <Route path="process/payment" element={<Elements stripe={loadStripe(stripeApiKey)} />}>
            <Route exact path="process/payment" element={<Payment />} />
          </Route> }
        </Route> 
      </Routes>
      <Footer />
    </Router>   

  );
}

export default App;
