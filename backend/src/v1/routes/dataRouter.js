const express = require('express');
const router = express.Router();
const { fetchData, getGlobalData } = require('../../utils/dataFetcher');

router.get('/data', (req, res) => {
  const data = getGlobalData();
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Data not available' });
  }
});

module.exports = router;
