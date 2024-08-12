const express = require('express');
const { getTrending, getList, getDetail, getExtra, getProvider } = require('../api/mediaController');
const { getSearch, getDiscover } = require('../api/searchController');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('getting api results');
})

router.get('/trending/:type', getTrending);
router.get('/list/:media/:type', getList);
router.get('/detail/:media/:id', getDetail);
router.get('/extra/:media/:id/:option', getExtra);
router.get('/provider/:media/:id', getProvider);

router.get('/search/:media', getSearch);

router.get('/discover/:media', getDiscover);


module.exports = router; 