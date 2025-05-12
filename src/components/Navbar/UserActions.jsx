import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, LogOut, UserPlus, ShoppingBag } from 'lucide-react';

import searchIcon from '../../assets/search_icon.png';
import profileIcon from '../../assets/profile_icon.png';
import cartIcon from '../../assets/cart_icon.png';

import useAuthStore from '../../store/useAuthStore';
import useProductStore from '../../store/useProductStore';
import useCartStore from '../../store/useCartStore';

export default function UserActions() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { setShowSearch } = useProductStore();
  const { getCartCount } = useCartStore();
  const { user, isLoggedIn, logoutUser } = useAuthStore();

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center gap-6 relative'>
      {/* Search Icon */}
      <img
        onClick={() => setShowSearch(true)}
        src={searchIcon}
        className='w-5 cursor-pointer'
        alt="Search Icon"
      />

      {/* Profile Dropdown */}
      <div className='relative' ref={dropdownRef}>
        <img
          src={profileIcon}
          className='w-5 cursor-pointer'
          alt="Profile Icon"
          onClick={toggleDropdown}
        />
        <div
          className={`absolute right-0 pt-2 z-50 transition-all duration-200 ease-out ${
            isDropdownOpen
              ? 'opacity-100 translate-y-0 visible'
              : 'opacity-0 -translate-y-2 invisible pointer-events-none'
          }`}
        >
          <div className='flex flex-col gap-3 w-44 py-4 px-5 rounded-xl shadow-xl border bg-white text-gray-700'>
            {isLoggedIn ? (
              <>
                <p className='text-sm font-medium cursor-default'>
                  Hi, {user?.username}
                </p>
                <Link to='/orders' onClick={closeDropdown} className='flex items-center gap-2 hover:text-black'>
                  <ShoppingBag className='w-4 h-4' />
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logoutUser(navigate);
                    closeDropdown();
                  }}
                  className='flex items-center gap-2 hover:text-black'
                >
                  <LogOut className='w-4 h-4' />
                  Logout
                </button>
              </>
            ) : (
              <div className='space-y-2'>
                <Link to='/register' onClick={closeDropdown} className='flex items-center gap-2 hover:text-black'>
                  <UserPlus className='w-4 h-4' />
                  Register
                </Link>
                <Link to='/login' onClick={closeDropdown} className='flex items-center gap-2 hover:text-black'>
                  <LogIn className='w-4 h-4' />
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Icon */}
      <Link to="/cart" className='relative'>
        <img src={cartIcon} className='w-5 min-w-5' alt="Cart Icon" />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
          {getCartCount()}
        </p>
      </Link>
    </div>
  );
}

