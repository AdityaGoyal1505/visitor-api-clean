// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getTotalUsers } = require('./ga4');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

app.get('/total-users', async (req, res) => {
  const users = await getTotalUsers(PROPERTY_ID);
  res.json({ totalUsers: users });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
