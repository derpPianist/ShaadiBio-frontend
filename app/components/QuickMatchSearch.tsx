'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

export default function QuickMatchSearch() {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // hide entirely before hydration to avoid match errors since it relies heavily on theme colors/content
  }

  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      elevation={24}
      sx={{
        position: { xs: 'relative', md: 'absolute' },
        bottom: { md: '-60px' },
        left: { md: '50%' },
        transform: { md: 'translateX(-50%)' },
        mt: { xs: -12, md: 0 },
        mx: { xs: 'auto', md: 0 },
        width: '90%',
        maxWidth: '1000px',
        p: { xs: 3, md: 4 },
        zIndex: 5,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
        {isDark ? <SearchIcon color="primary" /> : null} Quick Match Search
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-end' }}>
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>I AM LOOKING FOR</Typography>
          <FormControl fullWidth size="small">
            <Select defaultValue="woman" sx={{ borderRadius: 2 }}>
              <MenuItem value="woman">A Woman</MenuItem>
              <MenuItem value="man">A Man</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>AGE RANGE</Typography>
          <FormControl fullWidth size="small">
            <Select defaultValue="21-25" sx={{ borderRadius: 2 }}>
              <MenuItem value="18-20">18 - 20</MenuItem>
              <MenuItem value="21-25">21 - 25</MenuItem>
              <MenuItem value="26-30">26 - 30</MenuItem>
              <MenuItem value="30+">30+</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>RELIGION</Typography>
          <FormControl fullWidth size="small">
            <Select defaultValue="any" sx={{ borderRadius: 2 }}>
              <MenuItem value="any">Select Religion</MenuItem>
              <MenuItem value="hindu">Hindu</MenuItem>
              <MenuItem value="muslim">Muslim</MenuItem>
              <MenuItem value="christian">Christian</MenuItem>
              <MenuItem value="sikh">Sikh</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1 }}>CITY</Typography>
          <FormControl fullWidth size="small">
            <Select defaultValue="any" sx={{ borderRadius: 2 }}>
              <MenuItem value="any">Select City</MenuItem>
              <MenuItem value="mumbai">Mumbai</MenuItem>
              <MenuItem value="delhi">Delhi</MenuItem>
              <MenuItem value="bangalore">Bangalore</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: 1, width: '100%' }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ py: 1.5, borderRadius: 2, height: '40px' }}
            startIcon={isDark ? undefined : <SearchIcon />}
          >
            {isDark ? 'Show Matches' : 'Search'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
