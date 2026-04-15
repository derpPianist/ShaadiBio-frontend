'use client';

import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../theme/ThemeRegistry';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = ['Home', 'About Us', 'Membership', 'Contact'];

export default function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const pathname = usePathname();
  const isVerifyOtp = pathname === '/verify-otp';

  return (
    <AppBar position="absolute" color="transparent" elevation={0} sx={{ zIndex: 10, px: { xs: 2, md: 6 }, py: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Image src="/images/logo.png" alt="Shadi Ki Baat" width={32} height={32} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: theme.palette.text.primary }}>
            Shadi Ki Baat
          </Typography>
        </Box>

        {!isVerifyOtp && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: theme.palette.text.primary, fontWeight: 600, textTransform: 'none' }}>
                {item}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <LightModeIcon sx={{ color: theme.palette.text.primary }} /> : <DarkModeIcon sx={{ color: theme.palette.text.primary }} />}
          </IconButton>
          
          {!isVerifyOtp && (
            <>
              <Button component={NextLink} href="/login" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                Log In
              </Button>
              <Button component={NextLink} href="/signup" variant="contained" color="primary">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
