import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetails from './pages/ProductDetails'
import SearchProduct from './components/SearchProduct'
import OrderConfirmation from './components/OrderConfirmation'

import ProfilePage from './pages/ProfilePage'
import ProfileOverview from './components/ProfileOverview'
import Orders from './components/Orders'
import OrderDetails from "./components/OrderDetails";
import SavedAddress from "./components/SavedAddress";
import Review from './components/Review'
import Security from './components/Security'
import CollectionProducts from './pages/CollectionProducts'
import Collection from './components/Collection'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Profile route with nested children */}
         <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileOverview />} />
          <Route path="orders">
          <Route index element={<Orders />} />
          <Route path=":id" element={<OrderDetails />} /> 
        </Route>
          <Route path="addresses" element={<SavedAddress />} />
          <Route path="reviews" element={<Review />} />
          <Route path="security" element={<Security />} />
        </Route>
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:id" element={<CollectionProducts />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
