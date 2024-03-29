import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import Loading from '../layout/Loading/Loading';
import './LoginRegister.css';
import { clearErrors, login, register } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginRegister = () => {
  const alert = useAlert();
  const location = useLocation();
  const dispatch = useDispatch();
  const {loading, error, isAuthenticated} = useSelector(state => state.user);
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {

    if(error && error !== "Please Login to Access") {
      alert.error(error);
      dispatch(clearErrors());
    } 

    if(isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./avatarPreview.png");

  const registerDataChange = (e) => {
      if (e.target.name === "avatar") {
        const reader = new FileReader();

        reader.onload = () => {
          // 0 - Initial, 1 - Processing, 2 - Done
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        // Key: Value, name: value of name, email: value of email...
        setUser({ ...user, [e.target.name]: e.target.value }); 
      }
  };


  const loginSubmit = (e) => {
      e.preventDefault();
      dispatch(login(loginEmail, loginPassword));
  }

  const registerSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };


  return (
    <Fragment>
      { loading ? (<Loading />) : 
      (
        <Fragment>
        <div className="loginRegisterContainer">
          <div className="loginRegisterBox">
            <div className="loginRegisterToggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            
            <input type="submit" value="Login" className="loginBtn" />
            <Link to="/password/forgot"><span>Forgot Password?</span></Link>
          </form>
          <form
            className="registerForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="registerName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="registerEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="registerPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="registerBtn" />
          </form>
          </div>
        </div>
    </Fragment>
      ) 
      }
    </Fragment>
  )
}

export default LoginRegister