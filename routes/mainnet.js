const express = require('express');
const router = express.Router();

const {getMainnetNFTs} = require('../controllers/nftController');

router.route('/ERC721Transfers').get(getMainnetNFTs);


module.exports = router;