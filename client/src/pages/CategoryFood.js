import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopcontext';

const CategoryFood = () => {
  const { name } = useParams();
  const { foods } = useContext(ShopContext);
  // console.log(foods.filter(food => food.category === name));

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Foods in {name} Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.filter(food => food.category.toLowerCase() === name.toLowerCase()).map((food) => (
            <Link to={`/fooddetailpage/${food._id}`}>
              <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{food.name}</h3>
                  <p className="text-sm text-gray-600">{food.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryFood
