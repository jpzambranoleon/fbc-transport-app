import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Fab,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useContext, useEffect } from "react";
import { useState } from "react";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { InfoContext } from "../utility/InfoProvider";
import { io } from "socket.io-client";

export default function ChatRoom() {
  const { authorizedUser } = useContext(InfoContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const userId = localStorage.getItem("user");

  useEffect(() => {
    socket.current = io("ws://localhost:4500");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={authorizedUser} />
              </div>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {currentChat ? (
            <List sx={{ height: "67vh", overflowY: "auto" }}>
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender === userId} />
                </div>
              ))}
            </List>
          ) : (
            <Typography>Open a conversation to start a chat</Typography>
          )}
          <Divider />
          <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                size="small"
                variant="standard"
                label="Type Something"
                fullWidth
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={handleSubmit}
              >
                <Send />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
