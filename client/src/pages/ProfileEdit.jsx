import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../utility/InfoProvider";

export default function ProfileEdit() {
  const { setStatus, authorized } = useContext(InfoContext);
  const userId = localStorage.getItem("user");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_IMAGES_PERSON;
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
  });

  useEffect(() => {
    if (authorized) {
      setLoading(true);
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${userId}`);
        setUser(res.data);
        setLoading(false);
      };
      fetchUser();
    }
  }, [authorized, userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(file);

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("image", file);
      formData.profilePic = fileName;

      axios.post("/upload", data);
    }
    axios
      .put(`/users/update/${user._id}`, {
        userId: user._id,
        data: formData,
      })
      .then((res) => {
        setStatus({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        window.location.reload();
      })
      .catch((err) => {
        let message = err.response ? err.response.data.message : err.message;
        setStatus({ open: true, message: message, severity: "error" });
      });
  };

  return (
    <main>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Avatar sx={{ width: 150, height: 150, margin: "auto" }} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row">
                <Button>Upload</Button>
                <Button color="error">Delete</Button>
              </Stack>
            </Box>
            <TextField
              defaultValue={user.username}
              id="username"
              onChange={(e) =>
                setFormData((prev) => ({ username: e.target.value }))
              }
              fullWidth
              multiline
              rows={1}
            />
            <TextField
              defaultValue={user.email}
              id="email"
              onChange={(e) =>
                setFormData((prev) => ({ email: e.target.value }))
              }
              fullWidth
              multiline
              rows={1}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box component="form">
              <Typography>First Name</Typography>
              <TextField
                defaultValue={user.firstName}
                id="firstName"
                onChange={(e) =>
                  setFormData((prev) => ({ firstName: e.target.value }))
                }
                fullWidth
                multiline
                rows={1}
              />
              <Typography>Last Name</Typography>
              <TextField
                defaultValue={user.lastName}
                id="firstName"
                onChange={(e) =>
                  setFormData((prev) => ({ lastName: e.target.value }))
                }
                fullWidth
                multiline
                rows={1}
              />
              <Typography>Bio</Typography>
              <TextField
                defaultValue={user.bio}
                id="bio"
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, bio: e.target.value }));
                }}
                fullWidth
                multiline
                rows={3}
              />
            </Box>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleSubmit}
              sx={{ textTransform: "none", mt: 3 }}
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Box>
    </main>
  );
}
