import { Link } from "react-router-dom";

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <div>
          <h1>Your cart is empty</h1>
          <p>Add a few products and they'll appear here.</p>
          <Link to="/" className="primary-button inline-button">
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR BAG</p>
          <h1>Shopping cart</h1>
        </div>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity">
                  <button onClick={() => onDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
                </div>
              </div>

              <div className="cart-item-total">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                <button
                  className="remove-button"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <hr />
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="primary-button checkout-button">
            Checkout
          </button>
          <p className="demo-note">Demo checkout — no payment is processed.</p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;