const express = require('express');
const cors = require('cors');
const { getTotalUsers } = require('./ga4');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // Or set to your frontend URL
}));

app.get('/api/visitors', async (req, res) => {
  const result = await getTotalUsers();
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
