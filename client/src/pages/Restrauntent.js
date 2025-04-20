import React, { useState } from 'react'

const Restrauntent = () => {

    // Sample restaurant data
    const restaurants = [
        {
            id: 1,
            name: "The Spice Hub",
            location: "Mumbai, India",
            rating: 4.5,
            cuisine: "Indian, Chinese",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            name: "La Bella Vita",
            location: "Rome, Italy",
            rating: 4.8,
            cuisine: "Italian",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Sakura Blossom",
            location: "Tokyo, Japan",
            rating: 4.7,
            cuisine: "Japanese",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            name: "Gourmet Corner",
            location: "New York, USA",
            rating: 4.6,
            cuisine: "Continental",
            image: "https://via.placeholder.com/300x200",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header Section */}
            <header className="bg-red-600 text-white py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-3xl font-bold">Discover Restaurants</h1>
                    <p className="mt-2 text-lg">
                        Explore top-rated restaurants from around the world!
                    </p>
                </div>
            </header>

            {/* Search Bar */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <input
                    type="text"
                    placeholder="Search restaurants by name, location, or cuisine..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
            </div>

            {/* Restaurant List */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Featured Restaurants
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <img
                                src={restaurant.image}
                                alt={restaurant.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {restaurant.name}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {restaurant.location}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Cuisine: {restaurant.cuisine}
                                </p>
                                <p className="mt-2 font-bold text-yellow-600">
                                    ⭐ {restaurant.rating}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );


}

export default Restrauntent



