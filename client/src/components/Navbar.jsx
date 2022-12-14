import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { InfoContext } from "../utility/InfoProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ChatBubbleOutline, HomeOutlined } from "@mui/icons-material";

const settings = ["Logout"];

const Navbar = () => {
  const { authorized } = useContext(InfoContext);
  const userId = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_IMAGES_PERSON;

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onContextMenuClick = (action) => {
    setAnchorElUser(null);
    if (action.toLowerCase() === "profile") {
      console.log("profile");
    } else if (action.toLowerCase() === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (authorized) {
      setLoading(true);
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${userId}`);
        setUser(res.data);
        setLoading(false);
      };
      fetchUser();
    }
  }, [authorized, userId]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "background.default" }}>
        <Toolbar
          sx={{
            width: { xl: "75%", lg: "90%" },
            margin: { xl: "0 auto", lg: "0 auto" },
          }}
        >
          <Typography
            variant="h6"
            component="h1"
            color="primary"
            sx={{ flexGrow: 1 }}
          >
            App
          </Typography>
          <IconButton size="large">
            <HomeOutlined color="primary" />
          </IconButton>
          <IconButton size="large">
            <ChatBubbleOutline color="primary" />
          </IconButton>
          <IconButton onClick={handleOpenUserMenu}>
            {loading ? (
              <Skeleton variant="circular" width={35} height={35} />
            ) : (
              <Avatar
                sx={{ height: 35, width: 35 }}
                src={
                  !user.profilePic ? "/broken-image.jpg" : PF + user.profilePic
                }
              />
            )}
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => onContextMenuClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
