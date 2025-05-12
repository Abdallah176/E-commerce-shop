import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menuIcon from '../../assets/menu_icon.png';
import backIcon from '../../assets/dropdown_icon.png';

export default function MobileMenu() {
  const [visible, setVisible] = useState(false);

  const links = [
    { to: '/', label: 'HOME' },
    { to: '/collection', label: 'COLLECTION' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
    { to: '/wishlist', label: 'WISHLIST' },
  ];

  return (
    <>
      {/* Menu Icon */}
      <img
        onClick={() => setVisible(true)}
        src={menuIcon}
        className='w-5 cursor-pointer sm:hidden'
        alt="Menu Icon"
      />

      {/* Slide Menu */}
      <div className={`absolute top-0 right-0 bg-white z-50 transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={backIcon} className='h-4' alt="Back Icon" />
            <p>Back</p>
          </div>

          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setVisible(false)}
              className='py-2 pl-6'
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
