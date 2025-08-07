const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Important for Render
  },
});

async function getTotalUsers() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2020-01-01',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const totalUsers = response.rows?.[0]?.metricValues?.[0]?.value || '0';
    return { totalUsers };
  } catch (error) {
    console.error('Google Analytics API Error:', error);
    return { totalUsers: '0' };
  }
}

module.exports = { getTotalUsers };
