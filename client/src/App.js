import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { InfoContext } from "./utility/InfoProvider";

function App() {
  axios.defaults.baseURL = "http://localhost:4400/api";

  // const { authorized } = useContext(InfoContext);

  return (
    <div className="App">
      <Box bgcolor={"background.default"} color="text.primary">
        <Router>
          <Navbar />
          <Grid container>
            <Grid item sm={3}></Grid>
          </Grid>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
