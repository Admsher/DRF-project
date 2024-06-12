const express = require('express');
const fs = require('fs');
const path = require('path');
const topdf = require('docx2pdf-converter');
const cors = require('cors');
const app = express();

app.use(cors)

app.post('/convert', (req, res) => {
  const inputPath = req.body.inputPath; // Assuming you pass the input file path from the frontend
  const outputPath = './output.pdf'; // Output file path

  topdf.convert(inputPath, outputPath, (err) => {
    if (err) {
      console.error('Error converting file:', err);
      return res.status(500).send('Error converting file');
    }

    console.log('File converted successfully');
    res.send('File converted successfully');
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
