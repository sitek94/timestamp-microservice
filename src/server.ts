import express from 'express';
import cors from 'cors';

const app = express();

// Cors
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));
