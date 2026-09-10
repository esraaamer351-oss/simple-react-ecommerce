import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const API_URL = "https://fakestoreapi.com/products";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Something went wrong while loading products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">WELCOME TO NOVA STORE</p>
          <h1>Find something you'll love.</h1>
          <p className="hero-text">
            A simple modern shopping experience built with React.
          </p>
        </div>
      </section>

      <section className="shop-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR PRODUCTS</p>
            <h2>Shop collection</h2>
          </div>
          <p>{filteredProducts.length} products</p>
        </div>

        <div className="filters">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option value={item} key={item}>
                {item === "all" ? "All categories" : item}
              </option>
            ))}
          </select>
        </div>

        {loading && <Loading />}
        {error && <div className="status-message error">{error}</div>}

        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="status-message">No products found.</div>
        )}
      </section>
    </main>
  );
}

export default Home;