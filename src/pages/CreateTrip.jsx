import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input1';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from './common/Spinner';
import toast from 'react-hot-toast';
import { Chat } from './common/AiModel';

const LOCATIONIQ_API_KEY = 'pk.2a73720d8cf276cef83eb4d3b5c9f44e';

const CreateTrip = () => {
  const [query, setQuery] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelCompanions, setTravelCompanions] = useState('');
  const [errors, setErrors] = useState({});
  const [jsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const budgetOptions = [
    { id: 1, title: "Cheap", description: "Stay conscious of costs", icon: "🪙" },
    { id: 2, title: "Moderate", description: "Keep cost on the average side", icon: "💵" },
    { id: 3, title: "Luxury", description: "Don't worry about cost", icon: "💰" },
  ];

  const personOptions = [
    { title: "Just Me", description: "A sole traveler in exploration.", icon: "✈️" },
    { title: "A Couple", description: "Two travelers in tandem", icon: "🥂" },
    { title: "Family", description: "A group of fun-loving adventurers", icon: "🏡" },
    { title: "Friends", description: "A bunch of thrill-seekers", icon: "⛵" },
  ];

  const navigate = useNavigate();

  const handleBackClick = () => {
    localStorage.clear();
    toast.success('Logout successfully');
    navigate('/');
  };

  const searchLocation = async (query) => {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: LOCATIONIQ_API_KEY,
          q: query,
          format: 'json',
        },
      });
      setLocationResults(response.data);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setLocationResults([]);
    setQuery(location.display_name);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedLocation) newErrors.selectedLocation = "Location is required";
    if (!days) newErrors.days = "Number of days is required";
    if (!budget) newErrors.budget = "Budget is required";
    if (!travelCompanions) newErrors.travelCompanions = "Travel companions are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = async () => {
    if (validateForm()) {
      setLoading(true);
      const prompt = `Generate best 9 places and their small descriptions, estimated costs, and locations for ${selectedLocation.display_name} for ${days} days, traveling with ${travelCompanions}, with a ${budget} budget. Return the only data in pure JSON format. dont give any other statement`;
      try {
        const result = await Chat.sendMessage(prompt);
        // const mockResponse = await result.response.text();
        const mockResponse = result.response.text();
        const cleanedResponse = mockResponse.replace('```json', '').replace('```', '');
        console.log(cleanedResponse);
        
        try {
          const data = JSON.parse(cleanedResponse);
          
          console.log(data);
          
          // Show success message
          toast.success('Data Generated Successfully');
          
          // Navigate to trip-summary with the data
          navigate('/trip-summary', { state: { tripData: data } });
        } catch (error) {
          // Handle JSON parsing errors
          console.error('Failed to parse JSON:', error);
          toast.error('Failed to process data');
        }
        
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderBudgetCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgetOptions.map((option) => (
        <Card
          key={option.id}
          className={`cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-yellow-500 ${budget === option.title ? 'bg-gray-900 border-yellow-500' : 'bg-black'}`}
          onClick={() => setBudget(option.title)}
        >
          <CardHeader>
            <CardTitle className="text-white">{option.title}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{option.icon}</p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderTravelCompanionCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {personOptions.map((option) => (
        <Card
          key={option.title}
          className={`cursor-pointer transition-transform transform hover:scale-105 hover:border-2 hover:border-blue-500 ${travelCompanions === option.title ? 'bg-gray-900 border-blue-500' : 'bg-black'}`}
          onClick={() => setTravelCompanions(option.title)}
        >
          <CardHeader>
            <CardTitle className="text-white">{option.title}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{option.icon}</p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="text-white mx-auto w-full px-4 max-h-screen bg-black sm:px-8 md:px-16 lg:px-24 xl:px-32 overflow-auto hide-scrollbar">
      <div className="py-8 max-w-4xl mx-auto">
        <div className="">
          <button 
            onClick={handleBackClick} 
            className="text-white flex items-center space-x-2">
            <FaArrowLeft />
            <span>Back to Home and logout</span>
          </button>
        </div>
        <h2 className="font-bold text-3xl mb-4 mt-2">Tell us your travel preferences 🏕️🌴</h2>
        <p className="text-gray-300 mb-8">
          Just provide some Visit information.
        </p>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-medium mb-3">What is your destination of choice?</h2>
            <div className="mb-4">
              <Input
                placeholder="Enter location (e.g., Paris, France)"
                className="w-full text-black"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  searchLocation(e.target.value);
                }}
              />
              {errors.selectedLocation && <p className="text-red-500 mt-1">{errors.selectedLocation}</p>}
            </div>
            {locationResults.length > 0 && (
              <ul className="bg-white text-black rounded max-h-60 overflow-y-auto">
                {locationResults.map((location) => (
                  <li
                    key={location.place_id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectLocation(location)}
                  >
                    {location.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-xl font-medium mb-3">How many days are you planning your trip?</h2>
            <Input
              placeholder="Ex: 3"
              type="number"
              className="w-full text-black"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            {errors.days && <p className="text-red-500 mt-1">{errors.days}</p>}
          </div>
          <div>
            <h2 className="text-xl font-medium mb-3">What is your budget range?</h2>
            {renderBudgetCards()}
            {errors.budget && <p className="text-red-500 mt-1">{errors.budget}</p>}
          </div>
          <div>
            <h2 className="text-xl font-medium mb-3">How many travel companions will join you?</h2>
            {renderTravelCompanionCards()}
            {errors.travelCompanions && <p className="text-red-500 mt-1">{errors.travelCompanions}</p>}
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="w-full flex items-center justify-center"
            onClick={handleChange}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Create Trip'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
