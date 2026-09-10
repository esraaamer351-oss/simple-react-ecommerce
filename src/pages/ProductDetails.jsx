import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <div className="status-message">Product not found.</div>;

  return (
    <main className="details-page">
      <Link to="/" className="back-link">← Back to products</Link>

      <section className="details-card">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-content">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="rating">
            ★ {product.rating?.rate ?? "N/A"} ({product.rating?.count ?? 0} reviews)
          </div>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <button
            className="primary-button"
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;