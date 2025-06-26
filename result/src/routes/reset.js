const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Reset votes endpoint - restricted to CLI access only
router.post('/', async (req, res) => {
  // Check if request is coming from localhost (CLI)
  const clientIp = req.ip || req.connection.remoteAddress;
  if (clientIp !== '127.0.0.1' && clientIp !== '::1' && clientIp !== 'localhost') {
    return res.status(403).json({ error: 'Access denied. This endpoint can only be accessed via CLI.' });
  }
  
  try {
    await pool.query('UPDATE votes SET count = 0');
    res.json({ success: true, message: 'All votes have been reset' });
  } catch (error) {
    console.error('Error resetting votes:', error);
    res.status(500).json({ error: 'Failed to reset votes' });
  }
});

module.exports = router;