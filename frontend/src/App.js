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
import { StripeCheckout } from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess'
import ViewMyOrders from './components/Order/ViewMyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import AllProductsList from './components/Admin/AllProductsList'
import NewProduct from './components/Admin/NewProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import Orders from './components/Admin/Orders'
import UpdateOrderStatus from './components/Admin/UpdateOrderStatus';
import Users from './components/Admin/Users'
import UpdateUser from './components/Admin/UpdateUser'
import ProductReviews from './components/Admin/ProductReviews'
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';
import PageNotFound from './components/layout/PageNotFound/PageNotFound';

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

  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // })

  return (
    <Router>
      <Header />
      { isAuthenticated && <UserMenu user={user} /> }
      {/* IN REACT-ROUTER-DOM V6, WE HAVE TO WRAP ALL OUR ROUTES WITHIN ROUTES COMPONENT */}
      <Routes>
      {/* NOW WE HAVE TO USE element={<Component />} instead of earlier component={Component} */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
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
            <Route exact path="/process/payment" element={<StripeCheckout stripeApiKey={stripeApiKey}/>} />
        </Route> 
        <Route isAdmin={true} path="/admin/dashboard" element={<ProtectedRoute />}>
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route isAdmin={true} path="/admin/products" element={<ProtectedRoute />}>
          <Route exact path="/admin/products" element={<AllProductsList />} />
        </Route>
        <Route isAdmin={true} path="/admin/product/new" element={<ProtectedRoute />}>
          <Route exact path="/admin/product/new" element={<NewProduct />} />
        </Route>
        <Route isAdmin={true} path="/admin/product/:id" element={<ProtectedRoute />}>
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route isAdmin={true} path="/admin/orders" element={<ProtectedRoute />}>
          <Route exact path="/admin/orders" element={<Orders />} />
        </Route>
        <Route isAdmin={true} path="/admin/order/:id" element={<ProtectedRoute />}>
          <Route exact path="/admin/order/:id" element={<UpdateOrderStatus />} />
        </Route>
        <Route isAdmin={true} path="/admin/users" element={<ProtectedRoute />}>
          <Route exact path="/admin/users" element={<Users />} />
        </Route>
        <Route isAdmin={true} path="/admin/user/:id" element={<ProtectedRoute />}>
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        </Route>
        <Route isAdmin={true} path="/admin/reviews" element={<ProtectedRoute />}>
          <Route exact path="/admin/reviews" element={<ProductReviews />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>   

  );
}

export default App;
