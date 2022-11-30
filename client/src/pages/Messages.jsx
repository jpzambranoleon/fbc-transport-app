import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { InfoContext } from "../utility/InfoProvider";

export default function Messages() {
  const { authorized } = useContext(InfoContext);
  const userId = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_IMAGES_PERSON;

  return (
    <main>
      <Grid container component={Box} sx={{ mt: 2 }}>
        <Grid item sm={4}>
          <Box
            bgcolor={"background.paper"}
            sx={{ height: 650, maxHeight: 650, border: 1, borderRadius: 2 }}
          >
            <Typography variant="h6" align="center">
              Chats
            </Typography>
            <Divider />
            <Box>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Remy Sharp"
                  secondary="I'll be in your neighborhood doing errands this…"
                />
              </ListItemButton>
              <Divider />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={8}>
          <Box
            bgcolor={"background.paper"}
            sx={{
              border: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" align="center">
              Messages
            </Typography>
            <Divider />
            <Box
              aria-label="scrollable-box"
              sx={{
                overflow: "auto",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                height: "100%",
                height: 546,
                maxHeight: 546,
              }}
            >
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
              <Typography>Messages</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                bgcolor: "red",
                position: "fixed",
                display: "flex",
                padding: 2,
              }}
            >
              <Avatar
                src={
                  !user.profilePic ? "/broken-image.jpg" : PF + user.profilePic
                }
              />
              <TextField size="small" fullWidth />
              <Button>send</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
