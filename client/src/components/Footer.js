import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FOOATO</h3>
            <p className="text-gray-400 text-sm">
              Bringing your favorite restaurants right to your doorstep. Fast, reliable, and delicious.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className=''>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <div className="flex ">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none flex-grow"
              />
              <button className="bg-orange-500 px-4 py-2 rounded-r-lg hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>


          
        </div>

        

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2023 FoodDelivery. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition">
              <span className="text-xl">📱</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition">
              <span className="text-xl">📘</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition">
              <span className="text-xl">📸</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition">
              <span className="text-xl">🐦</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
