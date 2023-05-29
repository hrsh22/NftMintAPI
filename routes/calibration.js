const express = require('express');
const router = express.Router();

const {getCalibrationNFTs} = require('../controllers/nftController');

router.route('/ERC721Transfers').get(getCalibrationNFTs);


module.exports = router;