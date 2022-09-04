import React from "react";
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const realVideos = [];
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      for (const key in data.items) {
        data.items[key].id.videoId && realVideos.push(data.items[key]);
      }
      setVideos(realVideos);
    });
  }, [selectedCategory]);

  return (
    <Stack
      sx={{
        flexDirection: {
          sx: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "96vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          sx={{ mt: 1.5, color: "#fff" }}
          variant="body2"
        >
          Copyright 2022 GrgZiv
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
