import React from 'react';
import Box from '@mui/material/Box';
import HeroSection from './components/HeroSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <Box component="main">
      <Box sx={{ position: 'relative', mb: { xs: 8, md: 10 } }}>
        <HeroSection />
      </Box>
      <Testimonials />
      <Footer />
    </Box>
  );
}
