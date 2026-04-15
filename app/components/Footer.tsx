'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? '#1C1515' : '#1A1A1A',
        color: '#FFFFFF',
        pt: 10,
        pb: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Image src="/images/logo.png" alt="Logo" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                SHADI KI BAAT
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#BBBBBB', mb: 3, pr: 2 }}>
              The most trusted matrimony brand since 2010. Helping you find your eternal happiness through smart matchmaking.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Search Profiles</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Success Stories</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Safety Tips</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Premium Plans</Typography>
            </Box>
          </Grid>

          {/* Help & Support */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Help & Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Customer Support</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Terms of Service</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Privacy Policy</Typography>
              <Typography variant="body2" sx={{ color: '#BBBBBB', cursor: 'pointer', '&:hover': { color: '#FFF' } }}>Report Profiles</Typography>
            </Box>
          </Grid>

          {/* Download App */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
              Download App
            </Typography>
            <Typography variant="body2" sx={{ color: '#BBBBBB', mb: 3 }}>
              Get the mobile app for a faster matchmaking experience on the go.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button 
                variant="outlined" 
                startIcon={<AppleIcon />} 
                sx={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'flex-start', py: 1 }}
              >
                <Box sx={{ textAlign: 'left', lineHeight: 1 }}>
                  <Typography variant="caption" sx={{ display: 'block', fontSize: '0.6rem' }}>Download on the</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>App Store</Typography>
                </Box>
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<ShopIcon />} 
                sx={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'flex-start', py: 1 }}
              >
                <Box sx={{ textAlign: 'left', lineHeight: 1 }}>
                  <Typography variant="caption" sx={{ display: 'block', fontSize: '0.6rem' }}>GET IT ON</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Google Play</Typography>
                </Box>
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: '#888888', letterSpacing: 1 }}>
            © 2024 SHADI KI BAAT. ALL RIGHTS RESERVED.
          </Typography>
          <Typography variant="caption" sx={{ color: '#888888', letterSpacing: 1 }}>
            📍 HEADQUARTERS: MUMBAI, INDIA
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
