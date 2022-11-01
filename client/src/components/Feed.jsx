import { Box } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import { InfoContext } from "../utility/InfoProvider";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user");
  const { setStatus } = useContext(InfoContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/posts/timeline/${userId}`)
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
    console.log(posts);
  }, [setStatus]);

  return (
    <Box>
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </Box>
  );
};

export default Feed;
