const mongoose = require('mongoose');

const ERC721TransfersSchema = new mongoose.Schema({
    tokenHash: {
        type: String,
        required: true,
    },
    blockNumber: {
        type: Number,
        required: true,
    },
    blockHash: {
        type: String,
        required: true,
    },
    tokenAddress: {
        type: String,
        required: true,
    },
    tokenID: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    tokenURI: {
        type: String,
    },
});

module.exports = mongoose.model("FilecoinMainnet-ERC721Transfers", ERC721TransfersSchema);
