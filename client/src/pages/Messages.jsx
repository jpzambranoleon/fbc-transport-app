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
import { useContext } from "react";
import { InfoContext } from "../utility/InfoProvider";

export default function Messagees() {
  const { authorized } = useContext(InfoContext);

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
                maxHeight: 541,
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
            </Box>
            <Box
              sx={{
                bgcolor: "red",
                position: "fixed",
                display: "flex",
                width: 734,
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  border: 1,
                  borderRadius: 7,
                  padding: 0.5,
                }}
              >
                <InputBase sx={{ flex: 1 }} placeholder="Message" />
                <Button>Send</Button>
                <TextField />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
