import { useState, useEffect, createContext } from "react";

const SearchContext = createContext();

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
  const [rateFilter, setRateFilter] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
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
      return product.rating.rate > rateFilter;
    }
    return filterCategories.includes(product.category) && product.rating.rate > rateFilter
  });

  const _findItemInCart = (payload) => {
    return cartProducts.filter((item) => item.id === payload.id)[0];
  };
  const _findItemInCartById = (id) => {
    return cartProducts.filter((item) => item.id === id)[0];
  };

  const addToCart = (payload) => {
    const item = _findItemInCart(payload);
    debugger
    if (item && item.quantity < 10) {
      item.quantity = item.quantity + 1;
      debugger
      setSubTotal(prev => prev + item.price)
      setCartProducts([
        ...cartProducts,
      ]);
    } else if (item && item.quantity == 10) {
      alert('cannot buy more than 10 of the same item ');
    } else {
      payload.quantity = 1;
      setSubTotal(prev => prev + payload.price)
      setCartProducts([
        ...cartProducts,
        payload
      ]);
    }
  };

  const deleteItemFromCart = (id) => {
    const item = _findItemInCartById(id);
    setSubTotal(prev => prev - item.price * item.quantity)
    setCartProducts(
      cartProducts.filter((item) => item.id !== id),
    );
  };

  const subtractItemQuantity = (payload) => {
    const item = _findItemInCart(payload);
    if (item && item.quantity > 1) {
      item.quantity = item.quantity - 1;
      setSubTotal(prev => prev - item.price)
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
        addToCart,
        deleteItemFromCart,
        cartProducts,
        subtractItemQuantity,
        setOrderByPrice,
        updateFilterCategories,
        setRateFilter,
        subTotal
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
