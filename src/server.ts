import express from 'express';
import cors from 'cors';
import path from 'path';
import { formatDate } from './utils';

const app = express();

// Cors
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

// Timestamp api route
app.get('/api/timestamp/:date?', (req, res) => {
  const date = req.params.date;
  const timestamp = Number(date);
  const dateObj = new Date(date);

  // No parameter provided return values for current time
  if (date === undefined) {
    const now = new Date();

    return res.json({
      unix: now.getTime(),
      utc: formatDate(now),
    });
  }

  // User provided a number, treat it as timestamp
  if (!isNaN(timestamp)) {
    return res.json({
      unix: timestamp,
      utc: formatDate(new Date(timestamp)),
    });
  }

  // Invalid format provided, return error
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Correct format, return values for given date
  return res.json({
    unix: dateObj.getTime(),
    utc: formatDate(dateObj),
  });
});

const PORT = 5000;

// Start listening for requests
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
