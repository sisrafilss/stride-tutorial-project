/* eslint-disable react/prop-types */
import SingleProduct from "./SingleProduct";

// eslint-disable-next-line react/prop-types
const Products = ({ products }) => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="py-8 font-bold text-3xl text-center">Our Products</h2>
      <div className="flex gap-6">
        {products.slice(0, 4).map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
