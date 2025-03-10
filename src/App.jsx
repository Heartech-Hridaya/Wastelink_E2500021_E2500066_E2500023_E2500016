import Hero from "./components/Hero";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import ReportWaste from "./components/ReportWaste";
import About from "./components/About";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Hero" element={
          <>
            <Header />
            <Hero />
            <HowItWorks />
            <ReportWaste />
            <About />
            <Impact />
            <Testimonials />
            <Contact />
            <Footer />
          </>
        } />
      </Routes>
      
      <main className="overflow-x-hidden bg-black">
        <Suspense  
          fallback={
            <div className="fixed inset-0 grid place-items-center bg-black text-white">
              Loading...
            </div>
          }
        >
        </Suspense>
      </main>      
    </>
  );
}

export default App;
