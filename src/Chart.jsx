import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

function Chart({ products }) {
  const data = products.map(product => ({
    name: product.name,
    price: product.price,
    count: product.count,
  }));

  return (
    <BarChart width={1200} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="price" fill="#8884d8" />
    <Bar dataKey="count" fill="#82ca9d" />
  </BarChart>
  );
}

Chart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

export default Chart