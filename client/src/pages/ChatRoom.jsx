import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function ChatRoom() {
  const [conversations, setConversations] = useState([]);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations" + userId);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
  }, [userId]);

  return (
    <div>
      <Grid
        container
        component={Paper}
        sx={{ width: "100%", height: "80vh", mt: 2 }}
      >
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="John Wick" />
            </ListItemButton>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <List>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp" />
              <ListItemText secondary="online" align="right" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice" />
              <ListItemText secondary="online" align="right" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker" />
              <ListItemText secondary="online" align="right" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List sx={{ height: "67vh", overflowY: "auto" }}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                size="small"
                variant="standard"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab size="small" color="primary" aria-label="add">
                <Send />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
