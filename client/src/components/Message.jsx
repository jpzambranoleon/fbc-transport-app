import { Grid, ListItem, ListItemText } from "@mui/material";

const Message = () => {
  return (
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
  );
};

export default Message;
