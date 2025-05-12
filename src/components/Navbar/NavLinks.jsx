import { NavLink } from 'react-router-dom';

export default function NavLinks() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/wishlist', label: 'WishList' },
  ];

  return (
    <ul className='hidden sm:flex gap-6 text-m text-gray-800 font-bold'>
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center relative group transition-all duration-300 ${
              isActive ? 'text-black' : ''
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span>{link.label}</span>
              <span
                className={`
                  h-[2px] w-2/4 bg-gray-800 mt-1 rounded-full 
                  transition-all duration-300 ease-in-out
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}
                `}
              ></span>
            </>
          )}
        </NavLink>
      ))}
    </ul>
  );
}
