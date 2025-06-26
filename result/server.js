const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import modules
const resultsRouter = require('./src/routes/results');
const resetRouter = require('./src/routes/reset');
const errorHandler = require('./src/middleware/errorHandler');
const { ensureDirectories } = require('./src/utils/directory');

// Initialize Express app
const app = express();
app.use(express.static('public'));
app.use(express.json());

// Ensure directories exist
ensureDirectories();

// Routes
app.use('/api/results', resultsRouter);
app.use('/api/reset', resetRouter);

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});