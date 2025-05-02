import React from 'react'
import LogoImg from '../../assets/logoo.png'
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 px-4 sm:px-10 md:px-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm">
        {/* Logo + Description */}
        <div>
          <img className="mb-5 w-32" src={LogoImg} alt="Logo" />
          <p className="w-full md:w-2/3 text-white leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro fugiat saepe praesentium hic totam rem iure in.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition text-lg">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition text-lg">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-500 transition text-lg">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-semibold mb-5">COMPANY</p>
          <div className="flex flex-col gap-2 text-white">
            <a href='/' className="hover:text-orange-600 transition-all cursor-pointer">Home</a>
            <a href='/about' className="hover:text-orange-600 transition-all cursor-pointer">About Us</a>
            <a href='/place-order' className="hover:text-orange-600 transition-all cursor-pointer">Delivery</a>
            <a href='/contact' className="hover:text-orange-600 transition-all cursor-pointer">Contact</a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-white">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-600" /> +20-011-433-639-12
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-600" /> abdalaagamal226@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr />
      <p className="py-5 text-sm text-center text-white">
        © 2024 <span className="font-medium text-orange-600">Revo (Store)</span> – All Rights Reserved.
      </p>
    </footer>
  )
}


