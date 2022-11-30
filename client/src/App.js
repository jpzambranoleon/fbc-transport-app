import { Box, Container, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Messages2 from "./pages/Messages2";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Register from "./pages/Register";
import { InfoContext } from "./utility/InfoProvider";

function App() {
  axios.defaults.baseURL = "http://localhost:4400/api";

  const { authorized } = useContext(InfoContext);

  return (
    <div className="App">
      <Box bgcolor={grey[200]} color="text.primary" sx={{ height: "100vh" }}>
        {authorized ? (
          <Router>
            <Navbar />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/chatroom" element={<ChatRoom />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
              </Routes>
            </Container>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </Router>
        )}
      </Box>
    </div>
  );
}

export default App;
