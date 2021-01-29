import express from 'express';
import cors from 'cors';

const app = express();

// Cors
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const PORT = 5000;

// Start listening for requests
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));