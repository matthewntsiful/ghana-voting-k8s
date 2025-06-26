const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const fs = require('fs');

// Load parties from shared config
const partiesData = fs.readFileSync('/config/parties.json', 'utf8');
const parties = JSON.parse(partiesData);

// Get results endpoint
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT party_code, count FROM votes ORDER BY count DESC'
    );
    
    // Calculate total votes
    const totalVotes = rows.reduce((sum, row) => sum + parseInt(row.count), 0);
    
    // Add percentage and party details to each row
    const resultsWithDetails = rows.map(row => ({
      ...row,
      name: parties[row.party_code]?.name || 'Unknown Party',
      color: parties[row.party_code]?.color || '#CCCCCC',
      percentage: totalVotes > 0 ? Math.round((row.count / totalVotes) * 100) : 0
    }));
    
    res.json({
      results: resultsWithDetails,
      totalVotes,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

module.exports = router;