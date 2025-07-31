import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

const AppState = (props) => {
  // const url = "http://localhost:2000/api";
  const url = "https://vernika-jewels.onrender.com/api";

  const [product, setProduct] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState()
  const [usercart, setUserCart] = useState([])
  const [fetchAddress, setfetchAddress] = useState([])
  const [collections, setCollections] = useState([])
const [collectionProducts, setCollectionProducts] = useState([]);
const [collectionName, setCollectionName] = useState('');
const [collectionDescription, setCollectionDescription] = useState('');

  // ✅ Fetch products and user profile on load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/fetchProducts`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setProduct(api.data.product);
        userprofile();
        userCart();
        fetchAddresses();
        fetchOrder();
        fetchcollections();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
    
  }, [token]);

  // ✅ Persist authentication from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setisAuthenticated(true);
      console.log("User authenticated from localStorage");
    }
  }, []);

  // ✅ Register user
  const registerUser = async (name, email, password) => {
    try {
      const api = await axios.post(`${url}/user/register`, {
        name,
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });

      return true;
    } catch (error) {
      toast.error("Registration failed", {
        position: "top-right",
        autoClose: 1500,
      });
      console.error("Register error:", error);
      return false;
    }
  };

  // ✅ Login user
  const loginUser = async (email, password) => {
    try {
      const api = await axios.post(`${url}/user/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const userToken = api.data.token;

      setToken(userToken);
      setisAuthenticated(true);
      localStorage.setItem('token', userToken);

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });

      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed", {
        position: "top-right",
        autoClose: 1500,
      });
      console.error("Login error:", error);
      return false;
    }
  };

  // ✅ user profile
      const userprofile = async () => {
      try {
        const api = await axios.get(`${url}/user/userprofile`, {
          headers: { "Content-Type": "application/json", 
          "Auth":token
          },
          withCredentials: true,
        });
        // console.log(api.data.user)
        setUser(api.data.user);
       
      } catch (error) {
        console.error("User details", error);
      }
    };

  // ✅ Logout user
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setisAuthenticated(false);
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 1500,
    });
  };
  // user cart
const userCart = async () => {
  try {
    const api = await axios.get(`${url}/cart/viewcart`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token,
      },
      withCredentials: true,
    });

    console.log("CART RESPONSE:", api.data.cart);

    // Defensive check
    const cartItems = Array.isArray(api.data.cart?.items)
      ? api.data.cart.items
      : Array.isArray(api.data.cart)
      ? api.data.cart
      : [];

    setUserCart(cartItems);
  } catch (error) {
    console.error("Error fetching user cart:", error);
  }
};


  // ✅ add to cart
      const addTocart = async (productId, title,price,qty,image) => {
      try {
        const api = await axios.post(`${url}/cart/add`,{productId, title,price,qty,image}, {
          headers: { "Content-Type": "application/json" ,
            "Auth":token,
          },
          withCredentials: true,
        });
       
        toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
        transition: Bounce,
      });
      userCart();
      return true;
     
       
      } catch (error) {
        console.error("Not added :", error);
      }
    };
// decrease qty
    const decreaseqty = async (productId, qty) => {
      try {
        const api = await axios.post(`${url}/cart/-qty`,{productId, qty} ,{
          headers: { "Content-Type": "application/json" ,
            "Auth":token, },
          withCredentials: true,
        });
        console.log(api)
       userCart();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
// increase qty
    const increaseqty = async (productId, qty) => {
      try {
        const api = await axios.post(`${url}/cart/incqty`,{productId, qty} ,{
          headers: { "Content-Type": "application/json" ,
            "Auth":token, },
          withCredentials: true,
        });
        console.log(api)
       userCart();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
//delete specific product
    const deleteProduct = async (productId) => {
      try {
        const api = await axios.delete(`${url}/cart/removeproduct` ,{
          data:{productId},
          headers: { "Content-Type": "application/json",
            "Auth":token, },
          withCredentials: true,
        });
        console.log(api)
       userCart();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
//clear CART
    const clearCart = async () => {
      try {
        const api = await axios.delete(`${url}/cart/clearcart` ,{
          headers: { "Content-Type": "application/json",
            "Auth":token, },
          withCredentials: true,
        });
        console.log(api)
        userCart();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

//fetch address
const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${url}/address/getaddress`, {
        headers: {
          Auth: token
        }
      });
       if (res.data.success) setfetchAddress(res.data.addresses);
    } catch (err) {
      console.error("Failed to fetch saved addresses", err);
    }
  };
// create Order
const createOrder = async (orderData) => {
    try {
      const res = await axios.post(`${url}/order/create`, orderData,{
        headers: {"Content-Type": "application/json"},
        withCredentials: true
      });
      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch saved addresses", err);
    }
  };
// fetch orders
const fetchOrder = async () => {
  try {
    const res = await axios.get(`${url}/order/userorder`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token,
      },
      withCredentials: true,
    });
    console.log("user Orders", res);
    return res; // ✅ RETURN the response!
  } catch (err) {
    console.error("Failed to fetch saved addresses", err);
    return null; // Optional: return null to avoid undefined
  }
};
// fetch orders

const fetchOrderDetails = async (orderId) => {
  try {
    const res = await axios.get(`${url}/order/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("Fetched Order Details", res);
    return res.data.order; // return only the order object
  } catch (err) {
    console.error("Failed to fetch order details", err);
    return null;
  }
};
//get all collection
const fetchcollections = async () => {
    try {
      const res = await axios.get(`${url}/collection/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Collections=",res.data.collections)
       setCollections(res.data.collections)
    } catch (err) {
      console.error("Failed to Collection", err);
    }
  };

// fetch collection products
const fetchcollectionProducts = async (id) => {
  try {
    const res = await axios.get(`${url}/collection/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const data = res.data.collection;
    setCollectionName(data.name);
    setCollectionDescription(data.description);
    setCollectionProducts(data.productIds); // make sure productIds are populated
  } catch (err) {
    console.error("Failed to fetch Collection", err);
  }
};



  return (
    <AppContext.Provider value={{
      product,
      registerUser,
      loginUser,
      logoutUser,
      isAuthenticated,
      setisAuthenticated,
      token,
      setToken,
      user,
      addTocart,
      usercart,
      decreaseqty,
      increaseqty,
      deleteProduct,
      clearCart,
      fetchAddress,
      fetchAddresses,
      url,
      createOrder,
      fetchOrder,
      fetchOrderDetails,
      collections,
      fetchcollectionProducts,
      collectionProducts,
      collectionName,
      collectionDescription
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
