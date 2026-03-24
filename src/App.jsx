import { useState } from 'react';
import Loader from './components/Loader';
import DiamondParticles from './components/DiamondParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Collections from './components/Collections';
import Story from './components/Story';
import Featured from './components/Featured';
import Craftsmanship from './components/Craftsmanship';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <DiamondParticles />
          <Navbar />
          <Hero />
          <Marquee />
          <Collections />
          <Story />
          <Featured />
          <Craftsmanship />
          <Testimonials />
          <CallToAction />
          <Footer />
          <ChatBot />
        </>
      )}
    </>
  );
}

export default App;
