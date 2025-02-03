import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-10 lg:py-10 mg:py-10">

      {/* Animated Heading with Slide-up and Fade-in */}
      <motion.h1 
        initial={{ opacity: 0, y: -40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl"
      >
        <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
        Customized Itineraries at Your Fingertips
      </motion.h1>

      {/* Animated Subtitle with Fade-in from Bottom */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl"
      >
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </motion.p>

      {/* Button with Bounce & Fade-in */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="mt-4"
      >
        <Link to={'/create-trip'}>
          <Button className="px-8 py-4 text-lg md:text-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            Get Started
          </Button>
        </Link>
      </motion.div>

      {/* Image Section with Fade-in Animation */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="w-full mt-8"
      >
        <img 
          src="/landing.png" 
          alt="Landing Image"
          className="w-full h-auto rounded-lg"
        />
      </motion.div>

    </section>
  )
}

export default Hero
