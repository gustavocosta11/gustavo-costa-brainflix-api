const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

router.get("/videos", function (req, res) {
  let currentVideos = JSON.parse(fs.readFileSync("./data/videos.json"));
  res.status(201).json(currentVideos);
});

router.get("/videos/:id", function (req, res) {
  let currentVideos = JSON.parse(fs.readFileSync("./data/videos.json"));
  let singleVideo = currentVideos.find((video) => video.id === req.params.id);
  res.status(201).json(singleVideo);
});

router.post("/", (req, res) => {
  console.log(req.body);
  let newVideo = {
    title: req.body.title,
    channel: "Uploader Channel",
    image: "http://localhost:8080/images/Upload-video-preview.jpg",
    description: req.body.description,
    views: new Intl.NumberFormat().format(Math.round(Math.random() * 100000)), // format number
    likes: new Intl.NumberFormat().format(Math.round(Math.random() * 10000)), // format number
    timestamp: Date.now(),
    comments: [
      {
        name: "Andrea Timmins",
        comment: "Love this video!!",
        timestamp: Date.now(),
      },
      {
        name: "Jason webber",
        comment: "Would highly recommend, 10/10.",
        timestamp: Date.now(),
      },
    ],
    id: uuidv4(),
  };
  let currentVideos = JSON.parse(fs.readFileSync("./data/videos.json"));
  currentVideos.push(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(currentVideos));
  res.status(201).json(currentVideos);
});

module.exports = router;
