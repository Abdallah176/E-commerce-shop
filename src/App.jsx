import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Wishlist from './pages/WishList'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer ,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThankYou from './components/Contact/ThankYou'
import MarqueeText from './components/MarqueeText'
import ThankYouu from './components/PlaceOrder/ThankYouu'
import Error from './pages/Error'
import ProtectedRoute from './protected/ProtectedRoute'
import BestSeller from './components/Home/BestSeller'

export default function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]'>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide} />
          <MarqueeText/>
          <Navbar />
          <SearchBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/bestseller' element={<BestSeller/>} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/wishlist" element= {<ProtectedRoute> <Wishlist /> </ProtectedRoute> }/> 
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<ProtectedRoute> <PlaceOrder /> </ProtectedRoute>} />
            <Route path="/thank-youu" element={<ThankYouu />} />
            <Route path='/orders' element={<ProtectedRoute> <Orders /> </ProtectedRoute>} />
            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
    </div>
  )
}