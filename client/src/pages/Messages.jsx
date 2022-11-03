import {
  Avatar,
  Box,
  Divider,
  Grid,
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
      <Grid
        container
        component={Box}
        sx={{ mt: 2, border: 1, borderRadius: 2, height: 650 }}
      >
        <Grid item sm={4}>
          <Box
            bgcolor={"background.paper"}
            borderRadius={2}
            sx={{
              height: "100%",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: 1,
            }}
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
            borderRadius={2}
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
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
                height: 583,
              }}
            >
              <Typography>Messages</Typography>
            </Box>
            <Box sx={{ bgcolor: "red", flexGrow: 1 }}>
              <TextField variant="standard" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
