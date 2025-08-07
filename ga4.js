const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const propertyId = process.env.GA4_PROPERTY_ID;

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // this is important on Render
  },
});

async function getActiveUsers() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [{ name: 'totalUsers' }],
    });

    const totalUsers =
      response?.rows?.[0]?.metricValues?.[0]?.value ?? '0';

    return { totalUsers };
  } catch (err) {
    console.error('Error fetching analytics:', err.message, err);
    return { totalUsers: '0', error: err.message };
  }
}

module.exports = { getActiveUsers };
