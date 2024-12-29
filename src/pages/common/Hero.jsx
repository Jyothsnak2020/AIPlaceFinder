import React, { useState, useEffect } from "react";
import { BackgroundBeamsDemo } from "../BackgroundBeamsDemo";
import { AnimatedModalDemo } from "../AnimatedModalDemo";
import Header from "./Header";
import { Link } from "react-router-dom";
import Modal from 'react-modal'; // Import the modal library
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  useEffect(() => {
    // Check local storage for user data
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    toast.success('logout successfully');
    // Update state to reflect user is logged out
    setUser(null);
    // Close the modal
    closeModal();
  };

  return (
    <div className="h-[100%] hide-scrollbar">
      <nav className="bg-black z-30 fixed top-0 left-0 w-full p-2 border-b border-gray-800">
        <div className="px-4 mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            <a href="/"><img src="/logo.svg" alt="Logo" /></a>
          </div>
          <div className="hidden md:flex space-x-4">
            {/* Add navigation items here */}
          </div>
          {user ? (
            <div
              className="relative flex items-center space-x-4"
              onMouseEnter={() => setIsHovered(true)} // Show modal on hover
              onMouseLeave={() => setIsHovered(false)} // Hide modal when not hovered
            >
              <img
                src={user.profilePic || 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo-thumbnail.png'}
                alt={user.name}
                className="w-10 h-10 rounded-full cursor-pointer"
                // Open modal on click
              />
              {/* Show the modal to the left of the avatar when hovered */}
              {isHovered && (
                <div className="absolute right-full mr-2 top-12 bg-white text-black p-4 rounded-lg shadow-lg z-50">
                  <div className="flex items-center space-x-4 flex-col">
                    <img
                      src={user.profilePic || 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo-thumbnail.png'}
                      alt={user.name}
                      className="w-16 h-16 rounded-full"
                    /> 
                                          <p className="text-sm text-gray-700 text-center">{user.email}</p>
                    <div>
                      <p className="text-sm ">Name: {user.username || user.name}</p>

                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                />
                <span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl"
                >
                  Login here!!
                </span>
              </button>
            </Link>
          )}
        </div>
      </nav>
      <BackgroundBeamsDemo>
        <div className="mx-4 z-50 relative hide-scrollbar">
          <h1 className="mx-4 relative z-10 text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Discover Your Next Adventure with AI:
          </h1>
          <h2 className="mt-4 relative z-10 text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-blue-600 to-neutral-600 text-center font-sans font-bold">
            Personalized Itineraries at Your Fingertips
          </h2>

          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-md text-center relative z-10">
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interests and budget <br />
            <Link to={'/explore'}>
              <button className="inline-flex mt-5 mb-5 h-10 animate-background-shine items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Explore More..
              </button>
            </Link>
          </p>

          <AnimatedModalDemo />
        </div>
      </BackgroundBeamsDemo>
      <div className="relative -z-1 bottom-0">
        {/* <CardHoverEffectDemo/> */}
      </div>

      {/* User Information Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Information"
        className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-black border text-white p-6 rounded-lg max-w-sm mx-auto z-50 transition-transform transform scale-95 opacity-0 animate-open">
          <h2 className="text-xl font-semibold mb-4 text-center">User Information</h2>
          <img
            src={user?.profilePic || 'https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo-thumbnail.png'}
            alt={user?.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
         <p className="text-lg font-semibold">Name: {user?.username || user?.name}</p>
          <p className="text-sm text-gray-300">Email: {user?.email}</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-4 justify-center">
            <Button
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </Button>
            <Button
              onClick={closeModal}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal> */}

      <style jsx>{`
        .animate-open {
          animation: scaleIn 0.3s ease-out forwards;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
