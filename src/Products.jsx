import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chart products={products} />
    </div>
  );
}

export default Products;