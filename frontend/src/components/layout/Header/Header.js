import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Header.css'
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@mui/material';

const Header = () => {

  const customTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff"
      }
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={customTheme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <NavLink to='/'><Typography
            variant="h5"
            noWrap
            component="div"
            color={"#000"}
            paddingRight={"15px"}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DEVCART
          </Typography></NavLink>
          <NavLink to='/'><Typography
            variant="h6"
            fontSize={"1rem"}
            color={"#000"}
            noWrap
            paddingLeft={"15px"}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Home
          </Typography></NavLink>
          <NavLink to='/products'><Typography
            variant="h6"
            noWrap
            component="div"
            fontSize={"1rem"}
            color={"#000"}
            paddingLeft={"15px"}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Products
          </Typography></NavLink>
          <NavLink to='/contact'><Typography
            variant="h6"
            noWrap
            fontSize={"1rem"}
            paddingLeft={"15px"}
            color={"#000"}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Contact
          </Typography></NavLink>
          <NavLink to='/about'><Typography
            variant="h6"
            color={"#000"}
            noWrap
            fontSize={"1rem"}
            paddingLeft={"15px"}
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            About
          </Typography></NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/search"><AiOutlineSearch fontSize="24px" color="inherit" /></NavLink>
            <NavLink to="/cart"><AiOutlineShoppingCart fontSize="24px" color="inherit"/></NavLink>
            <NavLink to="/login"><AiOutlineUser fontSize="24px" color="inherit" /></NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default Header;