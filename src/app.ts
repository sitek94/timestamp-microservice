import express from 'express';
import cors from 'cors';
import path from 'path';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, '../views'));
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));


// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

// Empty request
app.get('/api/timestamp/', (req, res) => {
  const now = new Date();

  return res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Request with date_string param
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;

  // dateString starts with 5 digits, treat it as timestamp
  if (/^\d{5,}/.test(dateString)) {
    const timestamp = +dateString;

    return res.json({
      unix: timestamp,
      utc: new Date(timestamp).toUTCString(),
    });
  }

  // Try to convert dateString to Date object
  const dateObj = new Date(dateString);

  // Invalid format provided
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Correct format, return values for given date
  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString(),
  });
});

// 404: Not Found
app.use((req, res) => {
  res.status(404).sendFile(path.resolve('views/404.html'));
});

export default app;