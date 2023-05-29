require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const { getHyperspaceNFTs } = require("./blockchain/getHyperspaceNFTs");
const { getCalibrationNFTs } = require("./blockchain/getCalibrationNFTs");
const { getMainnetNFTs } = require("./blockchain/getMainnetNFTs");


const PORT = process.env.PORT || 5000;
const hyperspace = require("./routes/hyperspace");
const calibration = require("./routes/calibration");
const mainnet = require("./routes/mainnet");
const uri = process.env.MONGODB_URL;

app.get("/", (req, res) => {
  res.send("Welcome to MintBoxx APIS!");
});

// set router
// app.use("/hyperspace/ERC721Transfers", nft_router);
app.use("/hyperspace", hyperspace);
app.use("/calibration", calibration);
app.use("/mainnet", mainnet);

// Global error handler for unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise rejection:", err);
});


const start = async () => {
  try {
    await connectDB(uri);
    app.listen(PORT, () => {
      console.log("Server is live!");
      console.log(`${PORT} is the magic port!`);
    });
    getHyperspaceNFTs();
    getCalibrationNFTs();
    getMainnetNFTs();
  } catch (err) {
    console.log(err);
  }
};

start();