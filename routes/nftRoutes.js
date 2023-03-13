const express = require('express');
const router = express.Router();

const {getAllNFTs} = require('../controllers/nftController');

router.route('/').get(getAllNFTs);


module.exports = router;