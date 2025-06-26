const fs = require('fs');
const path = require('path');

// Create necessary directories
const ensureDirectories = () => {
  const publicDir = path.join(__dirname, '../../public');
  const jsDir = path.join(publicDir, 'js');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
  }
};

module.exports = { ensureDirectories };