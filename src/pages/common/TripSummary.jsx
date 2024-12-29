import { useLocation, useNavigate } from 'react-router-dom';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { FaArrowLeft } from 'react-icons/fa'; // For the back icon
import { SparklesPreview } from '../SparklesPreview';

const TripSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData || [];
  console.log("xdata is",tripData);
  

  const handleBackClick = () => {
    navigate('/create-trip');
  };

  return (
    <div className="relative min-h-screen text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col">
      <div 
        className="absolute inset-0 -z-10" 
        style={{ 
          background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)'
        }}
      ></div>
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-auto pb-8">
        <button 
          onClick={handleBackClick} 
          className="absolute top-4 left-4 text-white flex items-center space-x-2 mb-4">
          <FaArrowLeft />
          <span>Back to Trip Add</span>
        </button>
        <SparklesPreview text={'Resulting Places'} />
        <HoverEffect items={tripData} />
      </div>
    </div>
  );
}

export default TripSummary;
