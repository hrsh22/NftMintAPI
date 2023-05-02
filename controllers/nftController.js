const ERC721Transfers = require('../models/ERC721Transfers');

const getAllNFTs = async (req, res) => {
    const {blockNumber, blockHash,tokenAddress,owner, sort, select} = req.query;
    const queryObject = {};

    // if(blockNumber){
    //     queryObject.blockNumber = blockNumber;
    // }

    // if(blockHash){
    //     queryObject.blockHash = blockHash;
    // }

    // if(tokenAddress){
    //     queryObject.tokenAddress = tokenAddress;
    // }

    // if(owner){
    //     queryObject.owner = owner;
    // }
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
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    console.log("queryObject: ",queryObject);

    const allNFTs = await apiData;
    res.status(200).json({ allNFTs, nbHits: allNFTs.length });
};



module.exports = {getAllNFTs};