import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authcontext';
import { ShopContext } from '../context/shopcontext';
import OIP from '../assets/OIP.jpeg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, foods, setFoods, clicked } = useContext(ShopContext)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const baseURL = "http://localhost:5000";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/foods/api/search`, {
        params: { query }
      });
      setResults(response.data);
      console.log(response.data);

    } catch (err) {
      setError('Error fetching search results.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gray-100">

        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Food delivery made simple
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Order from your favorite restaurants and get foods delivered to your doorstep
              </p>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your favorite foods "
                  className="px-6 py-3 w-96 border border-gray-300 rounded-l-lg focus:outline-none"
                />
                <button onClick={handleSearch} className="bg-orange-500 text-white px-6 py-3 rounded-r-lg hover:bg-orange-600">
                  Find Food
                </button>
              </div>
            </div>
          </div>
        </div>


        {results.length > 0 &&
          (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-100 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h2>
                <ul>
                  {
                    results.map((food) => (
                      <li key={food._id} className="py-2 border-b border-gray-200">
                        <Link to={`/fooddetailpage/${food._id}`}>
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
                              <p className="text-sm text-gray-600">{food.description}</p>
                            </div>
                            <div>
                              <img src={food.image} alt={food.name} className="w-20 h-20" />
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
                <button
                  onClick={() => setResults([])}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          )
        }

        {/* Popular Categories */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <Link to='/category/pizza'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">🍕</div>
                <div className="font-semibold">Pizza</div>
              </div>
            </Link>
            <Link to='/category/burger'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">🍔</div>
                <div className="font-semibold">Burger</div>
              </div>
            </Link>
            <Link to='/category/pasta'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">🍝</div>
                <div className="font-semibold">Pasta</div>
              </div>
            </Link>
            <Link to='/category/salad'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">🥗</div>
                <div className="font-semibold">Salad</div>
              </div>
            </Link>
            <Link to='/category/dessert'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">🍰</div>
                <div className="font-semibold">Dessert</div>
              </div>
            </Link>
            <Link to='/category/beverage'>
              <div className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-3xl mb-2">☕️</div>
                <div className="font-semibold">Beverage</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Featured Foods */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Foods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((foods, index) => (
              // <Link to={`/fooddetailpage/${foods._id}`}>
                <div key={foods._id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => navigate(`/fooddetailpage/${foods._id}`)}>
                  <img
                    src={foods.image || OIP} // Fallback image
                    alt={foods.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = OIP; // Fallback if image fails
                    }}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{foods.name}</h3>
                    <p className="w-full h-10 p-2 resize-none overflow-hidden text-ellipsis whitespace-nowrap">{foods.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-orange-500">${foods.price.toFixed(2)}</span>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        addToCart(foods._id, foods.name, foods.image, foods.price);
                      }} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        {clicked ? "Buy Now" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              // </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Home
