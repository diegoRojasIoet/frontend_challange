import { useState, useEffect, createContext } from "react";

const SearchContext = createContext();

// const initialState = {
// 	cart: [],
// 	toggleOrder: false,
// 	totalItems: 0,
// 	toggleItemInfo: false,
// 	itemDetailFocus: {},
// };

function SearchProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);  //{id, title, price, img}
  const [imageProduct, setImageProduct] = useState("");
  const [titleProduct, setTitleProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [orderbyPrice, setOrderByPrice] = useState("Name");
  const [filterCategories, setFilterCategories] = useState([]);


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

  const updateFilterCategories = (idx) => {
    setFilterCategories((prevCategories) => {
      const categoryExists = prevCategories.includes(idx);
  
      if (categoryExists) {
        return prevCategories.filter((category) => category !== idx);
      } else {
        return [...prevCategories, idx];
      }
    });
  }

  const _filterProductsByPrice = (item1, item2, order) => {
    if (order === "Name") {
      return item1.title.localeCompare(item2.title);
    }
    else if (order === "Price_Low") {
      return item1.price - item2.price;
    }
    else if (order === "Price_High") {
      return item2.price - item1.price;
    }
    else {
      return 0;
    }
  }

  const searchedProducts = products.filter((product) => {
    const productName = product.title.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return productName.includes(searchText);
  }).sort((item1, item2) => _filterProductsByPrice(item1, item2, orderbyPrice)
  ).filter((product) => {
    if (filterCategories.length === 0) {
      return true;
    }
    return filterCategories.includes(product.category)
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

  const _findItemInCart = (payload) => {
    return cartProducts.filter((item) => item.id === payload.id)[0];
  };

  const addToCart = (payload) => {
    const item = _findItemInCart(payload);
    if (item && item.quantity < 10) {
      item.quantity = item.quantity + 1;
      setCartProducts([
        ...cartProducts,
      ]);
    } else if (item && item.quantity == 10) {
      alert('cannot buy more than 10 of the same item ');
    } else {
      payload.quantity = 1;
      payload.totalPrice = payload.price * payload.quantity;
      setCartProducts([
        ...cartProducts,
        payload
      ]);
    }
  };

  const deleteItemFromCart = (id) => {
    setCartProducts(
      cartProducts.filter((item) => item.id !== id),
    );
  };

  const subtractItemQuantity = (payload) => {
    const item = _findItemInCart(payload);
    if (item && item.quantity > 1) {
      item.quantity = item.quantity - 1;
      setCartProducts([
        ...cartProducts,
      ]);
    };
  }

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
          calculateRatings,
          addToCart,
          deleteItemFromCart,
          cartProducts,
          subtractItemQuantity,
          setOrderByPrice,
          updateFilterCategories
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  }

  export { SearchContext, SearchProvider };
