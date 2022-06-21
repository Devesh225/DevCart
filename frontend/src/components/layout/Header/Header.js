import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import logo from "../../../images/logo.png";
import './Header.css';

const options = {
    burgerColor: "#EEEEEE",
    burgerColorHover: "#222831",
    logo,
    logoWidth: "10vmax",
    navColor1: "white",
    logoHoverColor: "#00ADB5",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#00ADB5",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    profileIcon: true,
    ProfileIconElement: AiOutlineUser,
    cartIcon: true,
    CartIconElement: AiOutlineShoppingCart,
    searchIcon: true,
    SearchIconElement: AiOutlineSearch,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#00ADB5",
    searchIconColorHover: "#00ADB5",
    cartIconColorHover: "#00ADB5",
    cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <ReactNavbar {...options} />
  )
}

export default Header