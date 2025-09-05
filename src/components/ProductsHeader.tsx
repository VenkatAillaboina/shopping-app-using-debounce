import { useCallback } from 'react'
import { BsFilterRight } from 'react-icons/bs'
import styles from '@/styles/ProductsHeader.module.css'

const ProductsHeader = ({ sortbyOptions, activeOptionId, changeSortby }) => {

  const onChangeSortby = useCallback(
    event => {
      changeSortby(event.target.value)
    },
    [changeSortby]
  )

  return (
    <div className={styles.productsHeader}>
      <h1 className={styles.productsListHeading}>All Products</h1>
      <div className={styles.sortByContainer}>
        <BsFilterRight className={styles.sortByIcon} />
        <p className={styles.sortBy}>Sort by</p>
        <select
          className={styles.sortBySelect}
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(option => (
            <option
              key={option.optionId}
              value={option.optionId}
              className={styles.selectOption}
            >
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
