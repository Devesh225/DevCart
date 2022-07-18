import React, { Fragment, useState } from 'react'
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';
import './UserMenu.css';

const UserMenu = ({ user }) => {
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
    
    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
    }

    function dashboard() {
        navigate("/admin/dashboard");
    }
    
    function orders() {
        navigate("/orders");
    }

    function account() {
        navigate("/account");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex: "1"}} />
      <SpeedDial
        ariaLabel="SpeedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{zIndex: "2"}}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "./avatarPreview.png"}
            alt=""
          />
        }
      >
        {options.map((item, index) => (
          <SpeedDialAction
            key={index}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserMenu;