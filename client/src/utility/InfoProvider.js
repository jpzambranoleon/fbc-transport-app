import { useState, createContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { isExpired } from "react-jwt";
import axios from "axios";

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [authorized, setAuthorized] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState({});
  const [status, setStatus] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (isExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }
    if (localStorage.getItem("user")) {
      const user = localStorage.getItem("user");
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${user}`);
        setAuthorizedUser(res.data);
      };
      fetchUser();
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <InfoContext.Provider
      value={{
        setStatus,
        authorized,
        setAuthorized,
        authorizedUser,
        setAuthorizedUser,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={status.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          severity={status.severity}
          sx={{ width: "100%" }}
        >
          {status.message}
        </MuiAlert>
      </Snackbar>

      {props.children}
    </InfoContext.Provider>
  );
};
