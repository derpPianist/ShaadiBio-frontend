"use client";
import Box from "@mui/material/Box";
import HeroSection from "./components/HeroSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loading, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(authenticated){
      //console.log("authenticated: ", authenticated)
      router.replace('/dashboard')
    }
  }, [authenticated]);

  return (
    <Box component="main">
      {!authenticated && ( 
        loading ? (
          <CircularProgress aria-label="Loading…" />
        ) : (
          <>
            <Box sx={{ position: "relative", mb: { xs: 8, md: 10 } }}>
              <HeroSection />
            </Box>
            <Testimonials />
            <Footer />
          </>
        )
      )}      
    </Box>
  );
}
