'use client';

import React, { useRef, useState } from 'react';
import { Box, Typography, Button, TextField, Link as MuiLink } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useTheme } from '@mui/material/styles';

export default function VerifyOtpPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow purely digits
    if (!/^\d*$/.test(value)) return;

    if (value.length <= 1) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOtpValues(newValues);

      // Move to next input if there's a value and we're not at the end
      if (value !== '' && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    // Backspace: clear and move to previous if empty
    if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#121212' : '#f5f5f7', pt: 10 }}>
      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 480,
          bgcolor: isDark ? '#1e1e1e' : '#ffffff',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.08)',
          p: 6
        }}>
          
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: isDark ? '#ffffff' : '#1a1a1a' }}>
            Verify your OTP
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#aaa' : '#666', mb: 5, lineHeight: 1.6 }}>
            Enter the 6-digit code sent to your email. This code is valid for the next 10 minutes.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 5 }}>
            {otpValues.map((value, index) => (
              <TextField
                key={index}
                inputRef={(el) => { inputsRef.current[index] = el; }}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="off"
                inputProps={{ 
                  maxLength: 1, 
                  style: { textAlign: 'center', fontSize: '1.25rem', fontWeight: 600, padding: '14px 10px' } 
                }}
                sx={{
                  width: '50px',
                  bgcolor: isDark ? '#2e2e2e' : '#fafafa',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: isDark ? '#444' : '#dcdcdc',
                    },
                    '&:hover fieldset': {
                      borderColor: isDark ? '#6A1B29' : '#6A1B29', // Maroon hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6A1B29', // Maroon focus
                      borderWidth: '2px'
                    },
                  },
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<VerifiedUserIcon />}
            sx={{
              bgcolor: '#6A1B29', // Matching the Maroon brand color
              color: '#fff',
              fontWeight: 700,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              mb: 3,
              '&:hover': { bgcolor: '#52141f' }
            }}
          >
            Verify OTP
          </Button>

          <Typography variant="body2" sx={{ color: isDark ? '#ccc' : '#555', textAlign: 'center', mb: 4 }}>
            Didn&apos;t get the code?{' '}
            <MuiLink href="#" underline="always" sx={{ color: isDark ? '#fff' : '#1a1a1a', fontWeight: 600 }}>
              Resend code
            </MuiLink>
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, mt: 2, borderTop: `1px solid ${isDark ? '#333' : '#eee'}`, pt: 4 }}>
            <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#888' : '#888', fontSize: '0.875rem' }}>
              Need help?
            </MuiLink>
            <MuiLink href="#" underline="hover" sx={{ color: isDark ? '#888' : '#888', fontSize: '0.875rem' }}>
              Send feedback
            </MuiLink>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
