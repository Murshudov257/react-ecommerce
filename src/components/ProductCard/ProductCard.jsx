import Rating from "@mui/material/Rating";
import "./ProductCard.css";

function ProductCard({ item }) {
  const newPrice = (
    item.price -
    (item.price * item.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="card">
      <img
        className="product-image"
        src={item.images[0]}
        alt={item.title}
      />

      <span className="discount">
        -{item.discountPercentage}%
      </span>

      <h2>{item.title}</h2>

      <p>{item.description}</p>

      <del>{item.price}$</del>

      <button className="price-button">
        {newPrice}$
      </button>

      <Rating
        value={Number(item.rating)}
        precision={0.5}
        readOnly
      />
    </div>
  );
}

export default ProductCard;