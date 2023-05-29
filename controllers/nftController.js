const ERC721Transfers = require("../models/ERC721Transfers");

const getAllNFTs = async (req, res) => {
  const { blockNumber, blockHash, tokenAddress, owner, sort, select } =
    req.query;
  const queryObject = {};

  if (blockNumber) {
    queryObject.blockNumber = new RegExp(`^${blockNumber}$`, "i");
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

  let apiData = ERC721Transfers.find(queryObject);

  if (sort) {
    apiData = apiData.sort(sort.replace(/,/g, ' '));
  }
  if (select) {
    apiData = apiData.select(select.replace(/,/g, ' '));
  }

  console.log("Query called!");

  const allNFTs = await apiData;
  res.status(200).json({ allNFTs, nbHits: allNFTs.length });
};

module.exports = { getAllNFTs };