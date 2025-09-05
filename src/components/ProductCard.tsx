import styles from "@/styles/ProductCard.module.css"

const ProductCard = ({ productData }) => {
  const { title, brand, imageUrl, rating, price } = productData

  return (
    <li className={styles.productItem}>
      <img src={imageUrl} alt="product" className={styles.thumbnail} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.brand}>by {brand}</p>
      <div className={styles.productDetails}>
        <p className={styles.price}>Rs {price}/-</p>
        <div className={styles.ratingContainer}>
          <p className={styles.rating}>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className={styles.star}
          />
        </div>
      </div>
    </li>
  )
}

export default ProductCard
