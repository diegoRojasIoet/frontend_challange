import { useState, useEffect, createContext } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [imageProduct, setImageProduct] = useState("");
  const [titleProduct, setTitleProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");

  const getData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await getData();
        setProducts(productList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const searchedProducts = products.filter((product) => {
    const productName = product.title.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return productName.includes(searchText);
  });

  const _calculateMean = (numbers) => {
    const sum = numbers.reduce((acc, value) => acc + value, 0);
    const mean = sum / numbers.length;

    return mean;
  }

  const calculateRatings = () => {
    const mensRating = []
    const womenRating = []
    const jeweleryRating = []
    const electronicsRating = []

    products.map((product) => {
      // [mens, women,jewelery, electronics]
  
      
      const category = product.category
      const rate = product.rating.rate
  
      if (category === "men's clothing") {
        mensRating.push(rate)
      } else if (category === "jewelery") {
        jeweleryRating.push(rate)
      } else if (category === "electronics") {
        electronicsRating.push(rate)
      } else {
        womenRating.push(rate)
      }
    })

    const mensRatingMean = _calculateMean(mensRating)
    const womenRatingMean = _calculateMean(womenRating)
    const jeweleryRatingMean = _calculateMean(jeweleryRating)
    const electronicsRatingMean = _calculateMean(electronicsRating)

    const ratings = [mensRatingMean, womenRatingMean, jeweleryRatingMean, electronicsRatingMean]
    const roundRatings = ratings.map(number => Math.round(number));
    return roundRatings
  };

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchedProducts,
        isLoading,
        isOpen,
        setIsOpen,
        imageProduct,
        setImageProduct,
        titleProduct,
        setTitleProduct,
        priceProduct,
        setPriceProduct,
        descriptionProduct,
        setDescriptionProduct,
        calculateRatings
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
