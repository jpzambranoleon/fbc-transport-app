import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { InfoContext } from "../utility/InfoProvider";
import Feed from "../components/Feed";

export default function Home() {
  const { authorized } = useContext(InfoContext);

  return (
    <main>
      <Box sx={{ mt: 2 }}>
        <Feed />
      </Box>
    </main>
  );
}
