import {
  Avatar,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_IMAGES_PERSON;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <ListItemButton>
      <ListItemIcon>
        <Avatar
          alt={user.username}
          src={!user.profilePic ? "/broken-image.jpg" : PF + user.profilePic}
        />
      </ListItemIcon>
      <Typography>{user.username}</Typography>
    </ListItemButton>
  );
};

export default Conversation;
