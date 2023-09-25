import { Handler } from '@netlify/functions';
import Client from 'shopify-buy';

const handler: Handler = async (event, context) => {
  // Set up your Shopify client using environment variables
  const client = Client.buildClient({
    domain: process.env.SHOPIFY_STORE_URL ?? '',
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '',
    apiVersion: ''
  });

  // Fetch Shopify data
  const data = await client.product.fetchAll();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
