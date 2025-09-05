"use client";

import { useState, useEffect, useCallback } from "react";
import { SpinnerCircular } from "spinners-react";
import Cookies from "js-cookie";
import { debounce } from "lodash";

import FiltersGroup from "@/components/FilterGroups";
import ProductCard from "@/components/ProductCard";
import ProductsHeader from "@/components/ProductsHeader";
import styles from "@/styles/home.module.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const categoryOptions = [
  { name: "Clothing", categoryId: "1" },
  { name: "Electronics", categoryId: "2" },
  { name: "Appliances", categoryId: "3" },
  { name: "Grocery", categoryId: "4" },
  { name: "Toys", categoryId: "5" },
];

const sortbyOptions = [
  { optionId: "PRICE_HIGH", displayText: "Price (High-Low)" },
  { optionId: "PRICE_LOW", displayText: "Price (Low-High)" },
];

const ratingsList = [
  {
    ratingId: "4",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: "3",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: "2",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: "1",
    imageUrl: "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

const Home = () => {
  const [productsList, setProductsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [activeRatingId, setActiveRatingId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const getProducts = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;

    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: "GET",
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        imageUrl: product.image_url,
        rating: product.rating,
      }));
      setProductsList(updatedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    const loginUser = async () => {
      const userDetails = { username: "rahul", password: "rahul@2021" };
      const url = "https://apis.ccbp.in/login";
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        Cookies.set("jwt_token", data.jwt_token, {
          expires: 30,
        });
      }
    };

    loginUser();
  }, []);

  useEffect(() => {
    getProducts();
  }, [activeOptionId, activeCategoryId, activeRatingId, searchInput]);

  const onUpdateActiveCategoryId = (id: string) => setActiveCategoryId(id);
  const onUpdateActiveRatingId = (id: string) => setActiveRatingId(id);

  
   const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchInput(value);
    }, 1000),
    []
  );

  const onUpdateSearchInput = (value: string) => {
    debouncedSearch(value);
  };

  const onClearFilters = () => {
    setActiveCategoryId("");
    setActiveRatingId("");
    setSearchInput("");
  };

  const renderProductsList = () => {
    if (productsList.length === 0) {
      return (
        <div className={styles.noProductsView}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className={styles.noProductsImg}
          />
          <h1 className={styles.noProductsHeading}>No Products Found</h1>
          <p className={styles.noProductsDescription}>
            We could not find any products. Try other filters.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.allProductsContainer}>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={setActiveOptionId}
        />
        <ul className={styles.productsList}>
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    );
  };

  const renderLoader = () => (
    <div className={styles.productsLoaderContainer}>
      <SpinnerCircular
        size={50}
        thickness={100}
        speed={100}
        color="rgba(11,105,255,1)"
        secondaryColor="rgba(0,0,0,0.1)"
      />
    </div>
  );

  const renderFailureView = () => (
    <div className={styles.failureViewContainer}>
      <img
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        className={styles.failureViewImage}
      />
      <h1 className={styles.failureViewHeading}>Oops! Something Went Wrong</h1>
      <p className={styles.failureViewDescription}>
        We are having some trouble processing your request. Please try again
      </p>
    </div>
  );

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.success:
        return renderProductsList();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className={styles.allProductsSection}>
      <FiltersGroup
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        activeCategoryId={activeCategoryId}
        activeRatingId={activeRatingId}
        onUpdateActiveCategoryId={onUpdateActiveCategoryId}
        onUpdateActiveRatingId={onUpdateActiveRatingId}
        onClearFilters={onClearFilters}
        onUpdateSearchInput={onUpdateSearchInput}
        searchInput={searchInput}
        getProducts={getProducts}
      />
      {renderViews()}
    </div>
  );
};

export default Home;
