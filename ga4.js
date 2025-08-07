// ga4.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.reple(/\\n/g, '\n'),
  },
});

async function getTotalUsers(propertyId) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2023-01-01',
          endDate: 'today',
        },
      ],
      metrics: [{ name: 'totalUsers' }],
    });

    return response.rows?.[0]?.metricValues?.[0]?.value || '0';
  } catch (error) {
    console.error('Analytics API Error:', error);
    return '0';
  }
}

module.exports = { getTotalUsers };
