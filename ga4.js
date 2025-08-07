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
      dimensions: [
        {
          name: 'country',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'totalUsers',
          },
          desc: true,
        },
      ],
      limit: 10, // Top 10 countries
    });

    const data = response.rows?.map(row => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      visitors: row.metricValues?.[0]?.value || '0',
    })) || [];

    return { visitorsByCountry: data };
  } catch (error) {
    console.error('Google Analytics API Error:', error);
    return { visitorsByCountry: [] };
  }
}

module.exports = { getTotalUsers };
