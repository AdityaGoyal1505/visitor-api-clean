import express from 'express';
import cors from 'cors';
import { getGAData } from './ga4.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

app.get('/api/analytics', async (req, res) => {
  try {
    const data = await getGAData();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in /api/analytics:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch GA4 data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
