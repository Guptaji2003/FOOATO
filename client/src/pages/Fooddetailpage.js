import React from 'react'
import { useParams } from 'react-router-dom'

const Fooddetailpage = () => {
  const [food, setFood] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`http://localhost:5000/foods/getfood/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food details');
        }
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFood();
  }, [id]);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <>
    
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={food?.image} 
                alt="Food"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">
                {food?.category}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {food?.name}
              </h1>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {food?.description}
              </p>
              <div className="mt-8">
                <span className="text-3xl font-bold text-gray-900">${food?.price}</span>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex items-center border rounded-lg px-3 py-2 mr-4">
                  <button onClick={handleDecreaseQuantity} className="text-gray-500 hover:text-gray-700 text-lg px-2">-</button>
                  <span className="mx-4 text-lg">{quantity}</span>
                  <button onClick={handleIncreaseQuantity} className="text-gray-500 hover:text-gray-700 text-lg px-2">+</button>
                </div>
                <button  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Preparation Time:</span>
                    <span className="text-gray-900">20-30 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Serving Size:</span>
                    <span className="text-gray-900">1 person</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Calories:</span>
                    <span className="text-gray-900">650 kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Fooddetailpage

