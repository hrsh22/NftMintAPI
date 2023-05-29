const ERC721TransfersHyperspace = require("../models/ERC721Transfers-hyperspace");
const ERC721TransfersCalibration = require("../models/ERC721Transfers-calibration");
const ERC721TransfersMainnet = require("../models/ERC721Transfers-mainnet");

const getHyperspaceNFTs = async (req, res) => {
  const { blockNumber, blockHash, tokenAddress, owner, sort, select } =
    req.query;
  const queryObject = {};

  if (blockNumber) {
    // queryObject.blockNumber = new RegExp(`^${blockNumber}$`, "i");
    queryObject.blockNumber = parseInt(blockNumber); // Parse the blockNumber as an integer
  }

  if (blockHash) {
    queryObject.blockHash = new RegExp(`^${blockHash}$`, "i");
  }

  if (tokenAddress) {
    queryObject.tokenAddress = new RegExp(`^${tokenAddress}$`, "i");
  }

  if (owner) {
    queryObject.owner = new RegExp(`^${owner}$`, "i");
  }

  let apiData = ERC721TransfersHyperspace.find(queryObject);

  if (sort) {
    apiData = apiData.sort(sort.replace(/,/g, ' '));
  }
  if (select) {
    apiData = apiData.select(select.replace(/,/g, ' '));
  }

  console.log("Hyperspace - Query called!");

  const allNFTs = await apiData;
  res.status(200).json({ total: allNFTs.length, allNFTs });
};

const getCalibrationNFTs = async (req, res) => {
    const { blockNumber, blockHash, tokenAddress, owner, sort, select } =
      req.query;
    const queryObject = {};
  
    if (blockNumber) {
    //   queryObject.blockNumber = new RegExp(`^${blockNumber}$`, "i");
    queryObject.blockNumber = parseInt(blockNumber); // Parse the blockNumber as an integer
    }
  
    if (blockHash) {
      queryObject.blockHash = new RegExp(`^${blockHash}$`, "i");
    }
  
    if (tokenAddress) {
      queryObject.tokenAddress = new RegExp(`^${tokenAddress}$`, "i");
    }
  
    if (owner) {
      queryObject.owner = new RegExp(`^${owner}$`, "i");
    }
  
    let apiData = ERC721TransfersCalibration.find(queryObject);
  
    if (sort) {
      apiData = apiData.sort(sort.replace(/,/g, ' '));
    }
    if (select) {
      apiData = apiData.select(select.replace(/,/g, ' '));
    }
  
    console.log("Calibration - Query called!");
  
    const allNFTs = await apiData;
    res.status(200).json({ total: allNFTs.length, allNFTs });
  };

  const getMainnetNFTs = async (req, res) => {
    const { blockNumber, blockHash, tokenAddress, owner, sort, select } =
      req.query;
    const queryObject = {};
  
    if (blockNumber) {
    //   queryObject.blockNumber = new RegExp(`^${blockNumber}$`, "i");
    queryObject.blockNumber = parseInt(blockNumber); // Parse the blockNumber as an integer
    }
  
    if (blockHash) {
      queryObject.blockHash = new RegExp(`^${blockHash}$`, "i");
    }
  
    if (tokenAddress) {
      queryObject.tokenAddress = new RegExp(`^${tokenAddress}$`, "i");
    }
  
    if (owner) {
      queryObject.owner = new RegExp(`^${owner}$`, "i");
    }
  
    let apiData = ERC721TransfersMainnet.find(queryObject);
  
    if (sort) {
      apiData = apiData.sort(sort.replace(/,/g, ' '));
    }
    if (select) {
      apiData = apiData.select(select.replace(/,/g, ' '));
    }
  
    console.log("Mainnet - Query called!");
  
    const allNFTs = await apiData;
    res.status(200).json({ total: allNFTs.length, allNFTs });
  };


module.exports = { getHyperspaceNFTs, getCalibrationNFTs, getMainnetNFTs };