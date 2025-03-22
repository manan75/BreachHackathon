import React from "react";
import { FaCar, FaLeaf, FaBatteryFull, FaMapMarkerAlt, FaUserCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
     
      
      {/* Hero Section */}
      <section id="home" className="relative">
        <div className="bg-black bg-opacity-50 text-white py-24 px-8">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Drive Towards a <span className="text-green-400">Greener</span> Future</h1>
              <p className="text-lg mb-6">Rent premium electric vehicles for a sustainable, enjoyable driving experience. Join the eco-friendly revolution on wheels.</p>
              <div className="flex space-x-4">
                <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors font-semibold">
                 <Link to="/dashb">Rent Now</Link>
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-200 rounded-lg w-full max-w-md h-64 flex items-center justify-center">
                <img src="https://e-vehicleinfo.com/wp-content/uploads/2024/02/be07-exterior-right-front-three-quarter.webp" className="h-full w-full"/>
                {/* <span className="text-gray-500">EV Car Image Placeholder</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose <span className="text-green-500">Eco Wheels</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaLeaf className="text-green-500 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Zero emissions driving experience that helps reduce your carbon footprint.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaBatteryFull className="text-green-500 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Long Range</h3>
              <p className="text-gray-600">Our fleet consists of vehicles with impressive range capabilities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-green-500 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Charging Network</h3>
              <p className="text-gray-600">Access to extensive charging networks across the country.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Vehicles */}
      <section id="vehicles" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Premium Electric Fleet</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img src="https://cdn.olaelectric.com/sites/evdp/pages/home/home_move_over_petrol_ola_s1_air_mweb.webp" className="w-full h-full"/>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Ola S2 Pro</h3>
                <p className="text-gray-600 mb-2">Range: 130 miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">Rs 30/hr</span>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img src="https://rukminim3.flixcart.com/image/850/1000/xif0q/electric-bike-scooter/e/y/u/lr-portable-charger-450x-lr-disc-booking-for-ex-showroom-price-original-imah3jfzb639eedf.jpeg" className="w-full h-full" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Ather Scooty</h3>
                <p className="text-gray-600 mb-2">Range: 122 miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">Rs 25/hr</span>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img src="https://mgmotor.scene7.com/is/image/mgmotor/cm-img-dsc-0191?$mg-rgb-tablet-image-responsive$&fmt=png-alpha" className="h-full w-full" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">MG Comet</h3>
                <p className="text-gray-600 mb-2">Range: 139 miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-500 font-bold">Rs 60/hr</span>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors font-semibold">
              View All Vehicles
            </button>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It <span className="text-green-400">Works</span></h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-300">Create an account in minutes</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose</h3>
              <p className="text-gray-300">Select from our premium EV fleet</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-300">Secure your EV with online payment</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
                  4
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-300">Pick up your EV and hit the road</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-gray-400 text-4xl mr-3" />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"I rented a Tesla Model 3 for a weekend trip and it was amazing! The car was immaculate and the process was so smooth."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-gray-400 text-4xl mr-3" />
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"First time driving an EV and Eco Wheels made it so easy. They explained everything and the Audi e-tron was a dream to drive."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-gray-400 text-4xl mr-3" />
                <div>
                  <h4 className="font-semibold">Jessica Williams</h4>
                  <div className="flex text-yellow-400">
                    ★★★★☆
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"Great service and fantastic cars. The only reason for 4 stars is I wish they had more pickup locations. Otherwise perfect!"</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Electric?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who are enjoying the future of transportation today.</p>
          <button className="bg-white text-green-500 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Your Journey
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaLeaf className="text-green-500 text-2xl" />
                <span className="text-xl font-bold">Eco Wheels</span>
              </div>
              <p className="text-gray-400 mb-4">Driving towards a sustainable future, one rental at a time.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Vehicles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Locations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Green Street</li>
                <li>Eco City, EC 12345</li>
                <li>Email: info@ecowheels.com</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Eco Wheels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;