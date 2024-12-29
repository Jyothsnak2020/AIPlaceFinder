import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { FaMapPin } from 'react-icons/fa'; // FontAwesome map pin icon

Modal.setAppElement("#root");
const searchGoogleImages = async (query) => {
  console.log(query);
  
  const API_KEY = 'AIzaSyD2fUWGhvulFANZ7yeugvnTtnkt4LUlVEo'; // Replace with your API key
  const CX = 'f2d154b33ea5c4082'; // Replace with your Custom Search Engine ID
  const URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&searchType=image&q=${query}`;

  try {
    const response = await axios.get(URL);
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
console.log("data us final",items);

  const openModal = async (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
    setLoading(true); // Set loading to true when the modal opens

    const images = await searchGoogleImages(item.place || item.name || item.title);
    if (images.length > 0) {
      setImageUrl(images[0].link);
    } else {
      setImageUrl(''); // Handle no image found
    }
    setLoading(false); // Set loading to false once the image is fetched
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
    setImageUrl("");
    setLoading(false); // Reset loading when the modal is closed
  };

  const openMap = (name,location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${location}`)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.places.map((item, idx) => (
  <div
    key={idx}
    className="relative group block p-1 h-full w-full mt-4 sm:mt-6 lg:mt-8"
    onMouseEnter={() => setHoveredIndex(idx)}
    onMouseLeave={() => setHoveredIndex(null)}
    onClick={() => openModal(item)}
  >
    <AnimatePresence>
      {hoveredIndex === idx && (
        <motion.span
          className="absolute inset-0 h-full w-full border bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
          layoutId="hoverBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
        />
      )}
    </AnimatePresence>

    <Card>
  {/* Safely display Name or Place */}
  <CardTitle className="text-[1.4rem]">
    {item.name || item.place || item.title
      ? `Name: ${item.name || item.place || item.title}`
      : "Name: Not available"}
  </CardTitle>

  {/* Conditionally display Cost */}
  {item.estimated_cost || item.cost ? (
    <CardTitle className="text-sm">
      {`Cost: ${item.estimated_cost || item.cost}`}
    </CardTitle>
  ) : null}

  {/* Conditionally display Location */}
  {item.location ? (
    <CardTitle className="text-sm">
      {`Location: ${item.location}`}
    </CardTitle>
  ) : null}

  {/* Safely display Description */}
  <CardDescription className="text-sm">
    {item.description ? `Description: ${item.description}` : "Description: Not available"}
  </CardDescription>
</Card>

  </div>
))}

      </div>

      <AnimatePresence>
        {modalIsOpen && (
     <Modal
     isOpen={modalIsOpen}
     onRequestClose={closeModal}
     contentLabel="Item Details"
     className="modal max-w-4xl w-full p-4 md:p-6 lg:p-8"
     overlayClassName="overlay"
   >
     <div className="flex flex-col items-center justify-center">
       {loading ? (
         <p className="text-center">Loading image...</p> // Loading message
       ) : (
         <img
           src={imageUrl || 'https://via.placeholder.com/600x400?text=Image+Not+Available'}
           alt="Item Image"
           className="modal-image w-[50%] h-auto object-cover rounded-lg"
         />
       )}
   
       <h2 className="text-2xl font-bold mt-4 text-center">
         {selectedItem?.name || selectedItem?.place || selectedItem?.icon}
       </h2>
   
       <p className="text-lg mt-2 text-center">
         {selectedItem?.estimatedCost
           ? `Cost: ${selectedItem.estimatedCost}`
           : selectedItem?.estimated_cost
           ? `Cost: ${selectedItem.estimated_cost}`
           : `Title: ${selectedItem?.title}`}
       </p>
   
       <p className="text-lg mt-2 text-center">
         {selectedItem?.location ? `Location: ${selectedItem.location}` : ``}
       </p>
   
       <p className="text-lg mt-2 text-center">
         {selectedItem?.description ? `Description: ${selectedItem.description}` : "No description available"}
       </p>
   
       {selectedItem?.location && (
         <div className="mt-4 text-center">
           <Button onClick={() => openMap(selectedItem.name || selectedItem.place, selectedItem.location)} className="flex items-center justify-center">
             <FaMapPin className="mr-2" />
             View on Map
           </Button>
         </div>
       )}
   
       <Button onClick={closeModal} className="mt-4">
         Close Modal
       </Button>
     </div>
   </Modal>
   
        )}
      </AnimatePresence>
    </>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-10",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "text-zinc-400 tracking-wide leading-relaxed text-xs md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
