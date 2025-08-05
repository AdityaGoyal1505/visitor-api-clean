import { BetaAnalyticsDataClient } from '@google-analytics/data';
import process from 'process';

export const getGAData = async () => {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  const propertyId = process.env.GA4_PROPERTY_ID;

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials,
  });

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'activeUsers' }],
  });

  return response.rows.map(row => ({
    country: row.dimensionValues[0].value,
    users: row.metricValues[0].value,
  }));
};
