import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.title}
        </Link>

        <div className="product-bottom">
          <strong>${product.price.toFixed(2)}</strong>
          <button onClick={() => onAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;