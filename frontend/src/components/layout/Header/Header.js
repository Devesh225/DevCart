import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import logo from "../../../images/logo.png";
import './Header.css';

const options = {
    burgerColor: "lightgray",
    burgerColorHover: "#222831",
    logo,
    logoWidth: "10vmax",
    navColor1: "white",
    logoHoverColor: "#DA0037",
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
    link1ColorHover: "#DA0037",
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
    profileIconColorHover: "#DA0037",
    searchIconColorHover: "#DA0037",
    cartIconColorHover: "#DA0037",
    cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <ReactNavbar {...options} />
  )
}

export default Header