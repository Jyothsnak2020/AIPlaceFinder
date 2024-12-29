
import { useEffect } from 'react';
import './App.css'
import Hero from './pages/common/Hero'
import { HeroParallaxDemo } from './pages/HeroParallaxDemo'

function App() {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, and Ctrl+Shift+J
    document.addEventListener('keydown', (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) // Ctrl+Shift+J
      ) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <>
     <div id='hero'>
    <Hero/>
    <HeroParallaxDemo/>
     </div>
    </>
  )
}

export default App
