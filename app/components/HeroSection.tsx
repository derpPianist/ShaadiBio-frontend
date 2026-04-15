'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

export default function HeroSection() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by returning a placeholder or identical structure before hydration
  if (!mounted) {
    return <Box sx={{ minHeight: '100vh', backgroundColor: '#231A1A' }} />;
  }

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 10,
        backgroundImage: 'url(/images/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isDark 
            ? 'rgba(35, 26, 26, 0.85)' 
            : 'rgba(251, 248, 246, 0.7)',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          px: 4,
          mt: -8,
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            color: isDark ? '#FFFFFF' : '#1A1A1A',
            mb: 2,
            fontSize: { xs: '3rem', md: '5rem' }
          }}
        >
          Find Your <span style={{ color: theme.palette.primary.main }}>Perfect</span> {isDark ? 'Match' : 'Life Partner'}
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            color: isDark ? '#BBBBBB' : '#4A4A4A', 
            mb: 6,
            fontWeight: 400,
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          {isDark 
            ? 'Experience the future of matrimony with our AI-powered matchmaking designed to find your soulmate faster and more securely. Join millions of happy couples.'
            : 'Connecting Hearts, Creating Forever'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 1.5, px: 4, borderRadius: 2 }}
          >
            Get Started
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup total={24} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
              <Avatar alt="User 1" src="/images/footer-bg.jpg" />
              <Avatar alt="User 2" src="/images/hero-bg.png" />
            </AvatarGroup>
            <Typography variant="body2" sx={{ color: isDark ? '#BBBBBB' : '#4A4A4A', fontWeight: 600 }}>
              5M+ Profiles
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
