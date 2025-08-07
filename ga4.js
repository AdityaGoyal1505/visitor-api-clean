import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient();

export async function getTotalUsers() {
  const propertyId = process.env.GA4_PROPERTY_ID;

  const request = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '2024-08-01', endDate: 'today' }],
    metrics: [{ name: 'totalUsers' }],
  };

  console.log('Sending request to GA4 API:', JSON.stringify(request, null, 2));

  try {
    const [response] = await analyticsDataClient.runReport(request);
    console.log('Received response from GA4 API:', JSON.stringify(response, null, 2));

    const totalUsers = response.rows?.[0]?.metricValues?.[0]?.value || "0";
    return { totalUsers };
  } catch (error) {
    console.error('❌ Error fetching data from GA4 API:', error);
    throw error;
  }
}
