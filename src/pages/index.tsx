import * as React from "react"

import axios from 'axios';

import Layout from "../components/layout"

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
}

const IndexPage: React.FC = () => {
  const [shopifyData, setShopifyData] = React.useState<ShopifyProduct[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/.netlify/functions/fetchShopifyData');
      const shopifyData = response.data;
      setShopifyData(shopifyData);
    } catch (error) {
      console.error('Error fetching Shopify data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      {shopifyData?.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>Handle: {product.handle}</p>

        </div>
      ))}
    </Layout>
  );
}

export default IndexPage
