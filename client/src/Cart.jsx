import React, { useState, useEffect } from 'react';
import RentPayment from './RazorPayment/RentPayment';

const sampleEvModels = [
    {
        id: 1,
        name: 'Honda Activa',
        pricePerHour: 60,
        image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/138913/activa-e-right-front-three-quarter.jpeg?isig=0',
    },
    {
        id: 2,
        name: 'Ola S1 Pro',
        pricePerHour: 80,
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/gig/s1z_product_image_product_section.webp',
    },
    {
        id: 3,
        name: 'Simple Energy One',
        pricePerHour: 70,
        image: 'https://images.91wheels.com//assets/b_images/main/models/profile/profile1732622164.jpg',
    },
    {
        id: 4,
        name: 'White Carbon GT5',
        pricePerHour: 90,
        image: 'https://cdn.bikedekho.com/processedimages/white-carbon-motors/gt5/640X309/gt560939ef51e5fa.jpg',
    },
    {
        id: 5,
        name: 'Ather 450X',
        pricePerHour: 75,
        image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/138913/activa-e-right-front-three-quarter.jpeg?isig=0',
    },
    {
        id: 6,
        name: 'Bajaj Chetak Electric',
        pricePerHour: 65,
        image: 'https://cdn.olaelectric.com/sites/evdp/pages/gig/s1z_product_image_product_section.webp',
    },
    {
        id: 7,
        name: 'TVS iQube Electric',
        pricePerHour: 55,
        image: 'https://images.91wheels.com//assets/b_images/main/models/profile/profile1732622164.jpg',
    },
    {
        id: 8,
        name: 'Hero Vida V1',
        pricePerHour: 85,
        image: 'https://cdn.bikedekho.com/processedimages/white-carbon-motors/gt5/640X309/gt560939ef51e5fa.jpg',
    }
];

const Cart = () => {
    const [evModels, setEvModels] = useState(sampleEvModels);
    const [filterModel, setFilterModel] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 40, max: 100 });
    const [cartItems, setCartItems] = useState([]);
    const [pickupMode, setPickupMode] = useState('centre');
    const [deliveryAddress, setDeliveryAddress] = useState({ address: '', area: '', city: '', pincode: '' });
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [hours, setHours] = useState({}); // Store hours for each cart item

    useEffect(() => {
        // Calculate delivery fee based on pickup mode (simple logic for demonstration)
        if (pickupMode === 'delivery') {
            setDeliveryFee(50); // Fixed delivery fee for demonstration
        } else {
            setDeliveryFee(0);
        }
    }, [pickupMode]);

    const filteredEvModels = evModels.filter(ev => {
        const modelMatch = ev.name.toLowerCase().includes(filterModel.toLowerCase());
        const priceMatch = ev.pricePerHour >= priceRange.min && ev.pricePerHour <= priceRange.max;
        return modelMatch && priceMatch;
    });

    const handleAddToCart = (evModel) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === evModel.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity = (updatedCartItems[existingItemIndex].quantity || 1) + 1;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { ...evModel, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const handleQuantityChange = (itemId, qty) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: parseInt(qty, 10) > 0 ? parseInt(qty, 10) : 1 } : item
        );
        setCartItems(updatedCartItems);
    };

    const calculateCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.pricePerHour * (item.quantity || 1)), 0) + deliveryFee;
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        // In real scenario, you'd proceed to payment gateway (like Razorpay) here.
        alert("Checkout initiated! (Razorpay integration would go here)");
        console.log("Checkout Details:", {
            cartItems,
            pickupMode,
            deliveryAddress: pickupMode === 'delivery' ? deliveryAddress : null,
            totalAmount: calculateCartTotal()
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Rent Your Electric Vehicle</h1>

            {/* Filter Section */}
            <div className="mb-6 flex space-x-4">
                <div className="flex items-center">
                    <label htmlFor="filterModel" className="mr-2 text-sm font-medium text-gray-700">Model Filter:</label>
                    <input
                        type="text"
                        id="filterModel"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter model name"
                        value={filterModel}
                        onChange={(e) => setFilterModel(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="minPrice" className="mr-2 text-sm font-medium text-gray-700">Min Price:</label>
                    <input
                        type="number"
                        id="minPrice"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 40 })}
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="maxPrice" className="mr-2 text-sm font-medium text-gray-700">Max Price:</label>
                    <input
                        type="number"
                        id="maxPrice"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100 })}
                    />
                </div>
            </div>

            {/* EV Models Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredEvModels.map(evModel => (
                    <div key={evModel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img className="h-48 w-full object-cover" src={evModel.image} alt={evModel.name} />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{evModel.name}</h3>
                            <p className="text-gray-700 mb-2">Price: ₹{evModel.pricePerHour}/hr</p>
                        
                               <RentPayment/>
                             
                               
                        </div>
                    </div>
                ))}
                {filteredEvModels.length === 0 && <div className="text-gray-500 col-span-full text-center">No EVs found matching your criteria.</div>}
            </div>

            {/* Cart Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <div className="flex items-center space-x-4">
                                        <img className="h-12 w-12 object-cover rounded" src={item.image} alt={item.name} />
                                        <div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-gray-700">₹{item.pricePerHour}/hr</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                                className="px-2 py-1 hover:bg-gray-200 focus:outline-none"
                                                disabled={(item.quantity || 1) <= 1}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-0 focus:ring-0"
                                                value={item.quantity || 1}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                min="1"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                                className="px-2 py-1 hover:bg-gray-200 focus:outline-none"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <span className="font-semibold">₹{(item.pricePerHour * (item.quantity || 1))}</span>
                                        <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="flex justify-between font-semibold mb-2">
                                <span>Subtotal:</span>
                                <span>₹{cartItems.reduce((total, item) => total + (item.pricePerHour * (item.quantity || 1)), 0)}</span>
                            </div>
                            <div className="flex justify-between font-semibold mb-2">
                                <span>Delivery Fee:</span>
                                <span>₹{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mb-4">
                                <span>Total:</span>
                                <span>₹{calculateCartTotal()}</span>
                            </div>

                            {/* Pickup Options */}
                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Pickup Mode</h4>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="pickupCentre"
                                        value="centre"
                                        className="mr-2"
                                        checked={pickupMode === 'centre'}
                                        onChange={(e) => setPickupMode(e.target.value)}
                                    />
                                    <label htmlFor="pickupCentre" className="mr-4">Pick up from Centre</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="delivery"
                                        value="delivery"
                                        className="mr-2"
                                        checked={pickupMode === 'delivery'}
                                        onChange={(e) => setPickupMode(e.target.value)}
                                    />
                                    <label htmlFor="delivery">Delivery to Location</label>
                                </div>
                            </div>

                            {/* Delivery Address Form */}
                            {pickupMode === 'delivery' && (
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Delivery Address</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" id="address" className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={deliveryAddress.address} onChange={(e) => setDeliveryAddress({...deliveryAddress, address: e.target.value})} />
                                        </div>
                                        <div>
                                            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                                            <input type="text" id="area" className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={deliveryAddress.area} onChange={(e) => setDeliveryAddress({...deliveryAddress, area: e.target.value})} />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                            <input type="text" id="city" className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={deliveryAddress.city} onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})} />
                                        </div>
                                        <div>
                                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                                            <input type="text" id="pincode" className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" value={deliveryAddress.pincode} onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;