'use client';

import React, { useContext, useState } from 'react';
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel, Link as MuiLink, IconButton, InputAdornment, Divider } from '@mui/material';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../theme/ThemeRegistry';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';

  const {setAccessToken} = useAuth()

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | {value: unknown}>) => {
    setFormData((prev) => ({...prev, [field]: e.target.value}))
  }

  const handleLogin = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json()

      if(!res.ok){
        console.log("Login Error data: ", data);
        return;
      }

      console.log("login data: ", data);

      setAccessToken(data.accessToken)

      router.push(`/dashboard?id=${encodeURIComponent(data.account.userId)}`)
      
    } catch (error) {

      console.error("Error while logging in: ", error)
      
    }

  }

  const handleGoogleLogin = () => {

      window.location.href = "http://localhost:5000/api/v1/auth/login/federated/google"

  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#121212' : '#f5f5f7', pt: 10 }}>
      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 1000,
          bgcolor: isDark ? '#1e1e1e' : '#fff',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.08)'
        }}>
          
          {/* Left Side - Image with Overlay */}
          <Box sx={{
            width: { xs: '100%', md: '50%' },
            position: 'relative',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'flex-end',
            color: 'white',
            p: 6
          }}>
            {/* Background Image */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/images/marriage-login.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0
            }} />
            
            {/* Maroon Overlay */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(90, 25, 35, 0.7)',
              zIndex: 1
            }} />

            {/* Text Content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>
                Start your journey to forever.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1.1rem', maxWidth: '90%' }}>
                Join thousands of happy couples who found their perfect match through Shadi Ki Baat.
              </Typography>
            </Box>
          </Box>

          {/* Right Side - Login Form */}
          <Box sx={{
            width: { xs: '100%', md: '50%' },
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: isDark ? '#1e1e1e' : '#fafafa', // Light grey so white inputs pop
          }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: isDark ? '#fff' : '#1a1a1a' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? '#aaa' : '#666', mb: 4 }}>
              Find your perfect life partner today
            </Typography>

            {/* Form Fields */}
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: isDark ? '#ccc' : '#333' }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  onChange={handleChange("email")}
                  placeholder="Enter your email or phone"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: isDark ? '#777' : '#999' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, bgcolor: isDark ? '#2e2e2e' : '#ffffff', '& fieldset': { borderColor: isDark ? '#444' : '#dcdcdc' } }
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#ccc' : '#333' }}>
                    Password
                  </Typography>
                  <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#ff4d6d' : '#762029', fontSize: '0.875rem', fontWeight: 600 }}>
                    Forgot Password?
                  </MuiLink>
                </Box>
                <TextField
                  fullWidth
                  onChange={handleChange("password")}
                  type="password"
                  placeholder="Enter your password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: isDark ? '#777' : '#999' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <VisibilityIcon sx={{ color: isDark ? '#777' : '#999' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, bgcolor: isDark ? '#2e2e2e' : '#ffffff', '& fieldset': { borderColor: isDark ? '#444' : '#dcdcdc' } }
                  }}
                />
              </Box>

              <FormControlLabel
                control={<Checkbox sx={{ color: isDark ? '#555' : '#ccc', '&.Mui-checked': { color: isDark ? '#ff4d6d' : '#762029' } }} />}
                label={<Typography variant="body2" sx={{ color: isDark ? '#bbb' : '#555' }}>Keep me logged in</Typography>}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: '#6A1B29', 
                  color: '#fff',
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': { bgcolor: '#52141f' }
                }}
                onClick={handleLogin}
              >
                Login to Account
              </Button>
            </Box>

            <Box sx={{ mt: 4, mb: 3, display: 'flex', alignItems: 'center' }}>
              <Divider sx={{ flexGrow: 1, borderColor: isDark ? '#333' : '#e0e0e0' }} />
              <Typography variant="body2" sx={{ px: 2, color: isDark ? '#777' : '#888' }}>
                Or continue with
              </Typography>
              <Divider sx={{ flexGrow: 1, borderColor: isDark ? '#333' : '#e0e0e0' }} />
            </Box>

            {/* Social Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
                onClick={handleGoogleLogin}
                sx={{
                  color: isDark ? '#ddd' : '#333',
                  borderColor: isDark ? '#444' : '#e0e0e0',
                  borderRadius: 2,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { borderColor: isDark ? '#666' : '#ccc', bgcolor: isDark ? '#2c2c2c' : '#f9f9f9' }
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
                sx={{
                  color: isDark ? '#ddd' : '#333',
                  borderColor: isDark ? '#444' : '#e0e0e0',
                  borderRadius: 2,
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { borderColor: isDark ? '#666' : '#ccc', bgcolor: isDark ? '#2c2c2c' : '#f9f9f9' }
                }}
              >
                Facebook
              </Button>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: isDark ? '#aaa' : '#555' }}>
                Don&apos;t have an account?{' '}
                <MuiLink component={NextLink} href="/signup" underline="hover" sx={{ color: isDark ? '#ff4d6d' : '#5E1A24', fontWeight: 700 }}>
                  Sign Up Now
                </MuiLink>
              </Typography>
            </Box>

          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', p: 3, borderTop: `1px solid ${isDark ? '#333' : '#e0e0e0'}` }}>
        <Typography variant="body2" sx={{ color: isDark ? '#777' : '#888', mb: { xs: 2, sm: 0 } }}>
          © 2024 Shadi Ki Baat. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#999' : '#888', fontSize: '0.875rem' }}>
            Privacy Policy
          </MuiLink>
          <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#999' : '#888', fontSize: '0.875rem' }}>
            Terms of Service
          </MuiLink>
          <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#999' : '#888', fontSize: '0.875rem' }}>
            Contact Us
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}
