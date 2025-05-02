import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from './SearchBar';
import CartDrawer from './CartDrawer';
import { IoMdClose } from 'react-icons/io';


//bg-[#ea2e0e]

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false)

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    } 

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }  
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div>
            <Link to={"/"} className="text-2xl font-medium">
              Rabbit
            </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Men
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Women
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Top Wear
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Bottom Wear
            </Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          <Link to={"/profile"} className="hover:text-black">
            <HiOutlineUser className="size-6 text-gray-700" />
          </Link>
          <button
            onClick={toggleNavDrawer}
            className='relative hover:text-black'
            >
             <HiOutlineShoppingBag className="size-6 text-gray-700" />
             <span className="absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
                4
             </span>
          </button>

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="size-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform
        transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      > 
        <div className="flex justify-end p-4">
           <button onClick={toggleNavDrawer}>
             <IoMdClose className="size-6 text-gray-600" />
           </button>
        </div>
      </div>
    </>
  )
}

export default Navbar