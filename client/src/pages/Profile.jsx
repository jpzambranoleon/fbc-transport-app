import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Feed from "../components/Feed";
import { InfoContext } from "../utility/InfoProvider";
import { Link } from "react-router-dom";

export default function Profile() {
  const { authorized } = useContext(InfoContext);
  const userId = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
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
    <main>
      <Box sx={{ mt: 2 }}>
        <Grid container>
          <Grid item sm={6}>
            <Avatar sx={{ width: 150, height: 150, margin: "auto" }} />
          </Grid>
          <Grid item sm={6}>
            <Box>
              <Typography>{user.firstName + " " + user.lastName}</Typography>
              <Typography>{user.username}</Typography>
              <Typography>{user.bio}</Typography>
            </Box>
            <Button component={Link} to="/profile/edit">
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Feed />
      </Box>
    </main>
  );
}
