import { Grid, ListItem, ListItemText } from "@mui/material";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <>
      {own ? (
        <ListItem key={message._id}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary={message.text}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                align="right"
                secondary={format(message.createdAt)}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      ) : (
        <ListItem key={message._id}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="left" primary={message.text}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText
                align="left"
                secondary={format(message.createdAt)}
              ></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      )}
    </>
  );
};

export default Message;
