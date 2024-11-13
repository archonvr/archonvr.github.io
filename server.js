const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Endpoint to get list of models
app.get('/models', (req, res) => {
  const modelsDir = path.join(__dirname, 'public/models');
  fs.readdir(modelsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    // Filter only .glb files and remove extensions
    const glbFiles = files.filter(file => file.endsWith('.glb'))
                          .map(file => file.replace('.glb', ''));
    res.json(glbFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

