// src/components/ProductsList.jsx
import { useEffect, useState } from 'react';
import Product from './Product.jsx';

const ProductsList = ({api, bbdd}) => {  
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(api, bbdd);
    const fetchProducts = async () => {      
        await fetch('http://localhost:3000/api/products', {
          headers: {
            Accept: 'application/json',
            'x-db-type': bbdd,
          },
        }).then((res) => res.json()).then((data) => setProductList(data)).catch((err) => console.error(err)).finally(() => setLoading(false));
    };

    if (api && bbdd) {
      fetchProducts();
    }
  }, [api, bbdd]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className='space-y-2'>
      {productList.length > 0 ? (
        productList.map((product) => (
          <Product key={product.id.toString()} name={product.name} onbasket={product.onbasket} />
        ))
      ) : (
        <li>No products found</li>
      )}
    </ul>
  );
};

export default ProductsList;
