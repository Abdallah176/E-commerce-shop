import { Link, NavLink } from 'react-router-dom'
import imgLogo from '../../assets/logo-3.png'
import searchIcon from '../../assets/search_icon.png'
import profileIcon from '../../assets/profile_icon.png'
import cartIcon from '../../assets/cart_icon.png'
import menuIcon from '../../assets/menu_icon.png'
import backIcon from '../../assets/dropdown_icon.png'
import { useState } from 'react'
import useShopStore from '../../store/useShopStore'

export default function Navbar() {
    const [visible,setVisible] = useState(false);
    const {setShowSearch, getCartCount} = useShopStore();
    
    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to={'/'}>
                <img className='w-28' src={imgLogo} />
            </Link>
            {/* Small ==> Hidden */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/wishlist' className='flex flex-col items-center gap-1'>
                    <p>WishList</p>
                    <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={()=> setShowSearch(true)} src={searchIcon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>
                    <Link to='/login'>
                        <img src={profileIcon} className='w-5 cursor-pointer' alt="" />
                    </Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 '>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded' >
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                <Link to="/cart" className='relative'>
                    <img src={cartIcon} className='w-5 min-w-5' alt=""/>
                    <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={ () => setVisible(true) } src={menuIcon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* SlideBar */}
            <div className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={backIcon} className='h-4' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6' to='/contact'>CONTACT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6' to='/wishlist'>WishList</NavLink>
                </div>           
            </div>
        </div>
    )
}