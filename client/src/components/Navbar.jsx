import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { InfoContext } from "../utility/InfoProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { authorized } = useContext(InfoContext);
  const userId = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_IMAGES_PERSON;

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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
          <IconButton>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
