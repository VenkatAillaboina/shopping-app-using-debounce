import { BiSearch } from "react-icons/bi";
import styles from "@/styles/FilterGroups.module.css";

const FiltersGroup = (props) => {
  const {
    categoryOptions,
    ratingsList,
    activeCategoryId,
    activeRatingId,
    onUpdateActiveCategoryId,
    onUpdateActiveRatingId,
    onClearFilters,
    onUpdateSearchInput,
  } = props;

  const onChangeSearchInput = (event) => {
    onUpdateSearchInput(event.target.value);
  };
  
  return (
    <div className={styles.filtersGroupContainer}>
      <div className={styles.searchContainer}>
        <input
          type="search"
          placeholder="Search"
          className={styles.searchInput}
          onChange={onChangeSearchInput}
        />
        <BiSearch className={styles.searchIcon} />
      </div>

      <h1 className={styles.filtersHeading}>Category</h1>
      <ul className={styles.categoriesList}>
        {categoryOptions.map((each) => {
          const isActive = activeCategoryId === each.categoryId;
          const categoryClass = isActive
            ? `${styles.categoryBtn} ${styles.activeFilter}`
            : styles.categoryBtn;
          return (
            <li key={each.categoryId} className={styles.categoryItem}>
              <button
                type="button"
                className={categoryClass}
                onClick={() => onUpdateActiveCategoryId(each.categoryId)}
              >
                <p>{each.name}</p>
              </button>
            </li>
          );
        })}
      </ul>

      <h1 className={styles.filtersHeading}>Rating</h1>
      <ul className={styles.ratingsList}>
        {ratingsList.map((each) => {
          const isActive = activeRatingId === each.ratingId;
          const ratingTextClass = isActive
            ? `${styles.ratingText} ${styles.activeFilter}`
            : styles.ratingText;
          return (
            <li key={each.ratingId} className={styles.ratingItem}>
              <button
                type="button"
                className={styles.ratingBtn}
                onClick={() => onUpdateActiveRatingId(each.ratingId)}
              >
                <img
                  src={each.imageUrl}
                  alt={`rating ${each.ratingId}`}
                  className={styles.ratingImg}
                />
                <span className={ratingTextClass}>& up</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={styles.clearFiltersBtn}
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
