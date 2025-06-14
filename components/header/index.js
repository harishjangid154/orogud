"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaHome, FaUser, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Import Font Awesome icons
import icon from "@/assets/svgs/file.svg";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle login state
  };

  return (
    <header className="bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <Link href="/" className="hover:text-gray-400 flex items-center">
            <Image
              src={icon}
              alt="Logo"
              width={40}
              height={40}
              className="inline-block mr-2"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {/* <Link href="/" className="flex items-center hover:text-gray-400">
            <FaHome className="mr-2" /> Landing Page
          </Link> */}
          <Link href="/account" className="flex items-center hover:text-gray-400">
            <FaUser className="mr-2" /> Account
          </Link>
          <Link href="/cart" className="flex items-center hover:text-gray-400">
            <FaShoppingCart className="mr-2" /> Cart
          </Link>
          <button
            onClick={handleLoginLogout}
            className="flex items-center hover:text-gray-400"
          >
            {isLoggedIn ? (
              <>
                <FaSignOutAlt className="mr-2" /> Logout
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" /> Login
              </>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            id="menu-button"
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden absolute top-0 left-0 w-full h-full bg-black text-white flex flex-col space-y-4 px-6 py-4 md:hidden z-50"
      >
        {/* Close Button */}
        <button
          className="text-white mb-4 self-end"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.add("hidden");
          }}
        >
          <FaTimes size={24} />
        </button>
        <Link href="/" className="flex items-center hover:text-gray-400">
          <FaHome className="mr-2" /> Landing Page
        </Link>
        <Link href="/account" className="flex items-center hover:text-gray-400">
          <FaUser className="mr-2" /> Account
        </Link>
        <Link href="/cart" className="flex items-center hover:text-gray-400">
          <FaShoppingCart className="mr-2" /> Cart
        </Link>
        <button
          onClick={handleLoginLogout}
          className="flex items-center hover:text-gray-400"
        >
          {isLoggedIn ? (
            <>
              <FaSignOutAlt className="mr-2" /> Logout
            </>
          ) : (
            <>
              <FaSignInAlt className="mr-2" /> Login
            </>
          )}
        </button>
      </div>
    </header>
  );
}