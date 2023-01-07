import { Grid, ListItem, ListItemText } from "@mui/material";

const Message = ({ message, own }) => {
  return (
    <>
      <ListItem key="1">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="right" primary={message.text}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align="right"
              secondary={message.createdAt}
            ></ListItemText>
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
    </>
  );
};

export default Message;
