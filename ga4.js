import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { google } from 'googleapis';

const propertyId = process.env.GA4_PROPERTY_ID;

// Read credentials from environment (Render-compatible)
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
});

export async function getGAData() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    });

    return response.rows || [];
  } catch (error) {
    console.error('Error fetching GA4 data:', error);
    throw error;
  }
}
