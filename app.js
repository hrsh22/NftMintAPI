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

var collectionJSON = [];

async function getNFTMints() {
  let provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/filecoin_testnet"
  );

  let filter = {
    topics: [ethers.utils.id("Transfer(address,address,uint256)"), null],
  };

  provider.on(filter, async (log, event) => {
    try{
    if (log.topics.length === 4) {
      var contract = new ethers.Contract(log.address, ERC721.abi, provider);
      var tokenURI = await contract.tokenURI(parseInt(Number(log.topics[3])));

      var tokenHash = ethers.utils.id(
        log.address + parseInt(Number(log.topics[3]))
      );

      // var transferInfo = {
      //     tokenHash: tokenHash,
      //     blockNumber : log.blockNumber,
      //     blockHash : log.blockHash,
      //     tokenAddress : log.address,
      //     tokenID : parseInt(Number(log.topics[3])),
      //     owner: "0x" + log.topics[2].substr(26),
      //     tokenURI : tokenURI
      // }

      // await connectDB(process.env.MONGODB_URL);

   
      // if (Object.values(collectionJSON).includes(tokenHash)) {
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
        console.log(creating);
        console.log("Updating entry in the database");
        // console.log("Updating entry in the database");
      // } else {
      //   collectionJSON = {
      //     ...collectionJSON,
      //     ...{
      //       tokenHash: tokenHash,
      //       blockNumber: log.blockNumber,
      //       blockHash: log.blockHash,
      //       tokenAddress: log.address,
      //       tokenID: parseInt(Number(log.topics[3])),
      //       owner: "0x" + log.topics[2].substr(26),
      //       tokenURI: tokenURI,
      //     },
      //   };
      //   const creating = await ERC721Transfers.create(collectionJSON);
      //   console.log(creating);
        // console.log(collectionJSON);
      //   console.log("Data imported successfully");
      //   // console.log(transferInfo)
      // }
    }
  } catch (err) {
    console.log(err);
    }
  });
}

// let provider = new ethers.providers.JsonRpcProvider(
//   "https://rpc.ankr.com/filecoin_testnet"
// );

// async function getERC721CollectionsPart2(blockNumber) {
//   try {
//     // await connectDB(process.env.MONGODB_URL);

//     let provider = new ethers.providers.JsonRpcProvider(
//       "https://rpc.ankr.com/filecoin_testnet"
//     );
//     var collectedAddresses = [];
//     console.log("\nSearching...");

//     let block;

//       //get block and transactions from blocknumber
//       try {
//         block = await provider.getBlockWithTransactions(Number(blockNumber));
//         console.log(`Block ${blockNumber}_>`);
//       } catch (err) {
// console.log(err);
//       }

//       //scan each transaction in block
//       for await (const transaction of block.transactions) {
//         //check if any smart contract created with this transaction
//         if (transaction?.creates !== null) {
//           //check if created smart contract is ERC721 or not
//           try {
//             const contract = new ethers.Contract(
//               transaction?.creates,
//               IERC721_ABI,
//               provider
//             );
//             const isERC721 = await contract.supportsInterface("0x80ac58cd");
//             if (isERC721) {
//               collectedAddresses.push(transaction?.creates);

//               collectionJSON = {
//                 ...collectionJSON,
//                 ...{ block: blockNumber, contractAddress: transaction?.creates },
//               };
//               console.log(collectionJSON);
//               // await Product.deleteMany();
//               await connectDB(process.env.MONGODB_URL);
//               const creating = await Product.create(collectionJSON);
//               console.log(creating);
//               console.log("Data imported successfully");
//               console.log(collectionJSON);

//               // ERC721Collections.push(transaction?.creates);
//             } else {
//               continue;
//             }
//           } catch (_) {
//             continue;
//           }
//         }
//       }

//       //print result on console
//       if (collectedAddresses.length > 0) {
//         console.log(`For block ${blockNumber}: `, collectedAddresses);
//         collectedAddresses = [];
//         console.log("\nSearching...");
//       }

//   } catch (err) {
//     console.log(err);
//   }
// }

app.get("/", (req, res) => {
  res.send("Hi i am live!");
});

// set router

app.use("/api/ERC721Transfers", nft_router);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(PORT, () => {
      console.log("Server is live!");
      console.log(`${PORT} is the magic port!`);
    });
    getNFTMints();
  } catch (err) {
    console.log(err);
  }
};

start();
