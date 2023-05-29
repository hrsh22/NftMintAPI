require("dotenv").config();
var ethers = require("ethers");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const ERC721Transfers = require("./models/ERC721Transfers");

const PORT = process.env.PORT || 5000;

const nft_router = require("./routes/nftRoutes");

const uri = process.env.MONGODB_URL;

const ERC721 = require("@openzeppelin/contracts/build/contracts/ERC721.json");

async function getTestnetNFTs() {
  let provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/filecoin_testnet"
  );

  let filter = {
    topics: [ethers.utils.id("Transfer(address,address,uint256)"), null],
  };


    try {
      provider.on(filter, async (log, event) => {
        try {
          if (log.topics.length === 4) {
            var contract = new ethers.Contract(
              log.address,
              ERC721.abi,
              provider
            );
            var tokenURI = await contract.tokenURI(
              parseInt(Number(log.topics[3]))
            );

            var tokenHash = ethers.utils.id(
              log.address + parseInt(Number(log.topics[3]))
            );
            const creating = await ERC721Transfers.updateOne(
              { tokenHash: tokenHash }, // filter to select the document to update
              {
                $set: {
                  blockNumber: log.blockNumber,
                  blockHash: log.blockHash,
                  tokenAddress: log.address,
                  tokenURI: tokenURI,
                  tokenID: parseInt(Number(log.topics[3])),
                  owner: "0x" + log.topics[2].substr(26),
                },
              }, // update operator to update multiple fields
              { upsert: true } // options to create the document if it doesn't exist
            );
            console.log("Updating entry in the database!");
            console.log(creating);
          }
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  
}

app.get("/", (req, res) => {
  res.send("Welcome to MintBoxx APIS!");
});

// set router

app.use("/api/ERC721Transfers", nft_router);

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
    getTestnetNFTs();
  } catch (err) {
    console.log(err);
  }
};

start();