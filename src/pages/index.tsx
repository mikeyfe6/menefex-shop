import * as React from "react"
import { graphql, useStaticQuery } from "gatsby" // Import the required Gatsby modules

import axios from 'axios';

const IndexPage: React.FC = () => {
  const [shopifyData, setShopifyData] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/.netlify/functions/fetchShopifyData');
      const shopifyData = response.data;
      setShopifyData(shopifyData);
      // Now you can use shopifyData in your component
    } catch (error) {
      console.error('Error fetching Shopify data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log(shopifyData);
  // Define your GraphQL query here
  const data = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        nodes {
          handle
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
          }
          variants {
            shopifyId
          }
          title
          description
          featuredImage {
            src
          }
        }
      }
    }
  `);

  const products = data.allShopifyProduct.nodes;

  return (
    <main>
      {products.map((product: any) => (
        <div key={product.handle}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.variants.shopifyId}</p>
          <p>{product.priceRangeV2.maxVariantPrice.amount}</p>
          <img src={product.featuredImage.src} alt={product.title} style={{ width: "250px" }} />
        </div>
      ))}
    </main>
  );
}

export default IndexPage
