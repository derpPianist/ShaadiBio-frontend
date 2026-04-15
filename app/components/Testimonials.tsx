'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Testimonials() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ py: { xs: 8, md: 15 }, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 10 }, alignItems: 'center' }}>
          {/* Text on Left */}
          <Box sx={{ flex: 1, order: { xs: 1, md: 1 } }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 800, 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2
              }}
            >
              Celebrate Your Culture While Finding Modern Love
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary, 
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.6
              }}
            >
              We bridge the gap between traditional values and modern matchmaking. Our platform is designed for serious relationship seekers who value authenticity and security above all else.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                'Advanced filtering by profession, education, and lifestyle',
                'Real-time chat and secure video calling features',
                'Dedicated relationship managers for premium members'
              ].map((feature, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: theme.palette.primary.main, mt: 0.5 }} />
                  <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Image on Right */}
          <Box sx={{ flex: 1, width: '100%', order: { xs: 2, md: 2 } }}>
            <Box 
              sx={{ 
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <Box
                component="img"
                src="/images/footer-bg.jpg"
                alt="Testimonial Match"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
