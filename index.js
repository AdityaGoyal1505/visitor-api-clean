const express = require('express');
const cors = require('cors');
const { getReport } = require('./ga4');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/api/analytics', async (req, res) => {
  try {
    const report = await getReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GA4 report' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
