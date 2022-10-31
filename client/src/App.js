import { Box } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import { InfoContext } from "./utility/InfoProvider";

function App() {
  axios.defaults.baseURL = "http://localhost:4400/api";

  const { authorized } = useContext(InfoContext);

  return (
    <div className="App">
      <Box bgcolor={"background.default"} color="text.primary">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
