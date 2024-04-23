import { Product } from '../types';

export type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <div>
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product, key) => (
          <Product key={key} product={product} />
        ))}
      </div>
    </div>
  );
}

type ProductProps = { product: Product };
function Product({ product }: ProductProps) {
  return (
    <div className="product-card">
      <h4 className="product-card__title">{product.name}</h4>
      <p className="product-card__price">Price: {product.price}</p>
      <p className="product-card__quantity">In stock: {product.quantity}</p>
    </div>
  );
}
