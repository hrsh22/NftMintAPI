const express = require('express');
const router = express.Router();

const {getHyperspaceNFTs} = require('../controllers/nftController');

router.route('/ERC721Transfers').get(getHyperspaceNFTs);


module.exports = router;