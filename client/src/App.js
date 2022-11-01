import { Box, Grid } from "@mui/material";
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
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { InfoContext } from "./utility/InfoProvider";

function App() {
  axios.defaults.baseURL = "http://localhost:4400/api";

  const { authorized } = useContext(InfoContext);

  return (
    <div className="App">
      <Box bgcolor={"background.default"} color="text.primary">
        {authorized ? (
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
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
