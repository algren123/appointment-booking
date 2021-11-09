import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/">
                <a className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">
                    Company Name
                  </span>
                </a>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <a className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Home
                </a>
              </Link>
              <Link href="/appointment">
                <a className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Book
                </a>
              </Link>
              <Link href="/admin">
                <a className="py-4 px-2 text-gray-500 font-semibold hover:text-purple-500 transition duration-300">
                  Admin
                </a>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            <a
              href=""
              className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-purple-500 hover:text-white transition duration-300"
            >
              Log In
            </a>
            <a
              href=""
              className="py-2 px-2 font-medium text-white bg-purple-500 rounded hover:bg-purple-400 transition duration-300"
            >
              Sign Up
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setToggle(!toggle)}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-purple-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={!toggle ? 'hidden ' : '' + 'mobile-menu'}>
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block text-sm px-2 py-4 text-white bg-purple-500 font-semibold"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block text-sm px-2 py-4 hover:bg-purple-500 transition duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
