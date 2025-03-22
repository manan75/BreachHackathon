import React from 'react';
import { useState, useEffect } from 'react';
import RentPayment from './RazorPayment/RentPayment';

// EVMapComponent (extracted from previous response)
const EVMapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [evLocations, setEvLocations] = useState([]);
  const [mapZoom, setMapZoom] = useState(13); // Default zoom level
  const [filteredEvLocations, setFilteredEvLocations] = useState([]); // State for filtered EVs
  const [activeFilter, setActiveFilter] = useState('All EVs'); // State to track active filter
  const [distanceFilter, setDistanceFilter] = useState(null); // State for distance filter

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setMapZoom(13); // Adjust zoom when user location is available for better view
        },
        (error) => {
          console.error("Error getting user location:", error);
          // Default location (San Francisco) if geolocation fails
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
          setMapZoom(12); // Slightly zoomed out default view
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Default location (San Francisco) if geolocation is not supported
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
      setMapZoom(12);
    }
  }, []); // Run once on mount

  useEffect(() => {
    // Generate dynamic EV locations when userLocation is available
    if (userLocation) {
      const generatedEVs = generateNearbyEVs(userLocation, 5); // Generate 5 EVs
      setEvLocations(generatedEVs);
      setFilteredEvLocations(generatedEVs); // Initially show all EVs
    }
  }, [userLocation]); // Re-run when userLocation changes

  useEffect(() => {
    // Apply filters whenever evLocations, activeFilter, or distanceFilter changes
    applyFilters();
  }, [evLocations, activeFilter, distanceFilter]);


  const openStreetMapEmbedUrl = userLocation
    ? `https://www.openstreetmap.org/export/embed.html?mlat=${userLocation.lat}&mlon=${userLocation.lng}&zoom=${mapZoom}&layers=mapnik`
    : `https://www.openstreetmap.org/export/embed.html?mlat=37.7749&mlon=-122.4194&zoom=${mapZoom}&layers=mapnik`; // Default San Francisco if no user location yet


  const handleExpandMap = () => {
    if (userLocation) {
      const expandedMapUrl = `https://www.openstreetmap.org/#map=${mapZoom}/${userLocation.lat}/${userLocation.lng}`;
      window.open(expandedMapUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("Cannot expand map without location.");
    }
  };

  const handleFilterEVs = (filterType) => {
    setActiveFilter(filterType);
    setDistanceFilter(null); // Reset distance filter when changing EV type filter
  };

  const handleDistanceFilterChange = (distance) => {
    setDistanceFilter(distance);
    setActiveFilter('Distance'); // Set active filter to Distance when distance filter is applied
  };


  const applyFilters = () => {
    let filteredEVs = [...evLocations]; // Start with all EVs

    if (activeFilter === 'Charging Stations') {
      filteredEVs = filteredEVs.filter(ev => ev.isChargingStation);
    } else if (activeFilter === 'Fast Charging Only') {
      filteredEVs = filteredEVs.filter(ev => ev.isFastCharging);
    }

    if (distanceFilter) {
      const distanceValue = parseInt(distanceFilter.split(' ')[0]); // e.g., "5 miles" -> 5
      filteredEVs = filteredEVs.filter(ev => ev.distance <= distanceValue);
    }

    setFilteredEvLocations(filteredEVs);
  };


  const getDirectionsUrl = (evLocation) => {
    if (userLocation && evLocation) {
      const origin = `${userLocation.lat},${userLocation.lng}`;
      const destination = `${evLocation.lat},${evLocation.lng}`;
      // Using OpenStreetMap directions (you can replace with Google Maps or others)
      return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${origin};${destination}`;
    }
    return '#'; // No directions if no user or EV location
  };


  // --- Helper Functions ---

  // Function to generate random points within a radius (in km) of a center point
  const generateNearbyEVs = (center, count = 5, radiusKm = 20) => {
    const locations = [];
    for (let i = 0; i < count; i++) {
      const { lat, lng } = generateRandomPoint(center.lat, center.lng, radiusKm);
      const distance = calculateDistance(center.lat, center.lng, lat, lng); // Distance in miles
      const charge = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random charge between 60% and 100%
      const isChargingStation = Math.random() < 0.5; // 50% chance of being a charging station
      const isFastCharging = isChargingStation && Math.random() < 0.7; // 70% of charging stations are fast charging
      locations.push({
        name: `EV Center ${i + 1}`, // Generic EV center name
        lat,
        lng,
        distance: parseFloat(distance.toFixed(1)), // Distance in miles, rounded to 1 decimal
        charge,
        isChargingStation,
        isFastCharging,
      });
    }
    return locations;
  };


  // Function to generate a random point within a circle of radius km around a center point (lat, lng)
  function generateRandomPoint(lat0, lng0, radiusKm) {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const radiusLat = (radiusKm / earthRadiusKm) * (180 / Math.PI); // Radius in degrees latitude
    const radiusLng = radiusLat / Math.cos((lat0 * Math.PI) / 180); // Radius in degrees longitude (adjusted for latitude)

    const u = Math.random();
    const v = Math.random();
    const w = radiusLat * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    let lat = lat0 + y;
    let lng = lng0 + x / Math.cos((lat0 * Math.PI) / 180); // Adjust longitude based on latitude

    return { lat, lng };
  }


  // Haversine formula to calculate distance between two coordinates (in miles)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Earth radius in miles
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }


  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Find Nearby Electric Vehicles</h2>
          <span
            className="text-green-600 text-sm cursor-pointer hover:underline"
            onClick={handleExpandMap}
          >
            Expand Map
          </span>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="relative h-96 rounded-lg overflow-hidden mb-4">
            {/* OpenStreetMap Embed */}
            <iframe
              title="Nearby EVs Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={openStreetMapEmbedUrl}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Map Overlay - Displaying EV information */}
            <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg max-w-xs shadow-md overflow-y-scroll">
              <div className="font-semibold mb-2 text-gray-800">
                {activeFilter === 'Distance' ? `EVs within ${distanceFilter}` : `Nearest Available EVs (${activeFilter})`}
              </div>
              {filteredEvLocations.map((ev, index) => (
                <div key={index} className="bg-green-100 border-l-4 border-green-500 rounded-r p-3 mb-3 last:mb-0 overflow-y-auto">
                  <div className="font-semibold text-gray-800">{ev.name}</div>
                  <div className="text-gray-600 text-sm">{ev.distance} miles away • {ev.charge}% charged</div>
                  <div className="text-gray-600 text-sm">
                    {ev.isChargingStation && <span><i className="fa-solid fa-battery-full text-green-500 mr-1"></i> Charging Station </span>}
                    {ev.isFastCharging && <span>(<i className="fa-solid fa-bolt text-yellow-500 mr-1"></i> Fast)</span>}
                  </div>
                  <a href={getDirectionsUrl(ev)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-green-500 text-white font-semibold px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors">
                    Get Directions
                  </a>
                </div>
              ))}
              {filteredEvLocations.length === 0 && (
                <div className="text-gray-600">No EVs found matching the filter.</div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-3">
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-colors ${activeFilter === 'All EVs' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => handleFilterEVs('All EVs')}
              >
                <i className="fa-solid fa-car"></i> All EVs
              </button>
              <button
                className={`bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors ${activeFilter === 'Charging Stations' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => handleFilterEVs('Charging Stations')}
              >
                <i className="fa-solid fa-battery-full"></i> Charging Stations
              </button>
              <button
                className={`bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors ${activeFilter === 'Fast Charging Only' ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => handleFilterEVs('Fast Charging Only')}
              >
                <i className="fa-solid fa-bolt"></i> Fast Charging Only
              </button>
            </div>
            <div className="relative">
              <button
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors"
                onClick={() => handleDistanceFilterChange('5 miles')} // Example distance - you can make this dynamic
              >
                <i className="fa-solid fa-ruler"></i> Distance: 5 miles
              </button>
              {distanceFilter && (
                <button
                  onClick={() => handleDistanceFilterChange(null)}
                  className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  style={{ transform: 'translate(50%, -50%)' }}
                  aria-label="Clear distance filter"
                >
                  <i className="fa-solid fa-times-circle"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const UserMap = () => {
  return (
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 text-gray-800"> {/* Light background, dark text */}
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">8</div>
                  <div className="text-gray-600 text-sm">Available Vehicles</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600"> {/* Lighter green */}
                  <i className="fa-solid fa-car"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">3</div>
                  <div className="text-gray-600 text-sm">Active Rentals</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
                  <i className="fa-solid fa-key"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"> {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">85%</div>
                  <div className="text-gray-600 text-sm">KYC Completion</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"> {/* White background, shadow, hover effect */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-semibold">420</div>
                  <div className="text-gray-600 text-sm">CO₂ Kg Saved</div> {/* Slightly lighter text */}
                </div>
                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">  {/* Lighter green */}
                  <i className="fa-solid fa-leaf"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <EVMapComponent /> {/* Integrate EVMapComponent here */}


          {/* Available EVs */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Available Electric Vehicles</h2> {/* Dark text */}
              <span className="text-green-600 text-sm cursor-pointer hover:underline">View All</span> {/* Darker green */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlp9F0o3d4Da9A_yHBYre4o0qtPZdEF09K5w&s" alt="Tesla Model 3" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">  {/* White text */}
                    PREMIUM
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">OLA Bike</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 358 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 75 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$89/day</div> {/* Darker green */}
                   <RentPayment/>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="https://cdn.bikedekho.com/processedimages/ather-energy/450x/source/450x65ead7cdf293e.jpg" alt="Nissan Leaf" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"> {/* White text */}
                    ECO
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">Ather Scooty</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 270 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 62 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$59/day</div> {/* Darker green */}
                    <RentPayment/>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
                <div className="relative h-40">
                  <img src="https://mgmotor.scene7.com/is/image/mgmotor/cm-img-dsc-0191?$mg-rgb-tablet-image-responsive$&fmt=png-alpha" alt="Volkswagen ID.4" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold"> {/* White text */}
                    PREMIUM
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-semibold mb-2 text-gray-800">MG Comet</div> {/* Dark text */}
                  <div className="flex gap-4 mb-3 text-gray-600 text-sm"> {/* Slightly lighter text */}
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-bolt"></i> 320 km range
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-battery-three-quarters"></i> 77 kWh
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-green-600 font-semibold">$72/day</div> {/* Darker green */}
                    <RentPayment/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose EcoRide */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Why Choose EcoRide?</h2> {/* Dark text */}
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">  {/* White background, shadow, hover effect */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-battery-full"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Carbon Offset Program</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Every km you drive contributes to our tree planting initiative. Track your positive impact in real-time.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Flexible Swap</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Change to a different EV model mid-rental if your needs change, at no extra cost.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Free Charging</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Unlimited access to our network of 500+ charging stations across the country.</p> {/* Slightly lighter text */}
                </div>

                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl mx-auto mb-4">  {/* Lighter green */}
                    <i className="fa-solid fa-mobile-screen"></i>
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-800">Keyless Experience</h3> {/* Dark text */}
                  <p className="text-gray-600 text-sm">Unlock and start your EV with just your smartphone. No keys needed.</p> {/* Slightly lighter text */}
                </div>
              </div>
            </div>
          </div>
        </main>
  );
};

export default UserMap;