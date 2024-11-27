/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { assets } from "../constants/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";

const Navbar = () => {
  const { cartItems, getCartCount, setFilteredProducts, products } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSignIn = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-lg sticky top-0 z-10">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm text-gray-800">
        <NavLink to="/" className="hover:text-blue-500">HOME</NavLink>
        <NavLink to="/collection" className="hover:text-blue-500">COLLECTION</NavLink>
        <NavLink to="/about" className="hover:text-blue-500">ABOUT</NavLink>
        <NavLink to="/contact" className="hover:text-blue-500">CONTACT</NavLink>
      </ul>

      <form className="relative flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-l-md focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          Search
        </button>
      </form>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 p-1-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
              {isAuthenticated ? (
                <>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-blue-500">Logout</p>
                  <p className="cursor-pointer hover:text-blue-500">My Profile</p>
                  <p className="cursor-pointer hover:text-blue-500">Orders</p>
                </>
              ) : (
                <Link to="/SigninSIgnUp" className="cursor-pointer hover:text-blue-500">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-xs">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
