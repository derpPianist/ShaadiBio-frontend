'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { Visibility, VisibilityOff, Phone, Lock, Person, CalendarMonth, LocationCity } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// ── Form data shape ──────────────────────────────────────────────────
interface FormData {
  password: string;
  confirmPassword: string;
  phone_number: string;
  city: string;
  gender: string;
  dateOfBirth: Dayjs | null;
  email: string | null;
  full_name: string | null;
  googleId: string | null;
}

// ── Per-field error messages ─────────────────────────────────────────
interface FormErrors {
  password?: string;
  confirmPassword?: string;
  phone_number?: string;
  city?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string | null;
  full_name?: string | null;
  googleId?: string | null;
}

const CompleteAccount = () => {

  const searchParams = useSearchParams()
  const { setAccessToken } = useAuth()
  const router = useRouter()

  // ── UI state ───────────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  // ── Form state ─────────────────────────────────────────────────────
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
    phone_number: '',
    city: '',
    gender: '',
    dateOfBirth: null,
    email: searchParams.get("email"),
    full_name: searchParams.get("full_name"),
    googleId: searchParams.get("googleId"),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Helpers ────────────────────────────────────────────────────────
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
    if (errors.gender) {
      setErrors((prev) => ({ ...prev, gender: undefined }));
    }
  };

  const handleDateChange = (value: Dayjs | null) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: value }));
    if (errors.dateOfBirth) {
      setErrors((prev) => ({ ...prev, dateOfBirth: undefined }));
    }
  };

  // ── Validation ─────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone number – accepts digits, spaces, +, - and () (basic check)
    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    } else if (!/^[+]?[\d\s()-]{7,15}$/.test(formData.phone_number.trim())) {
      newErrors.phone_number = 'Enter a valid phone number';
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    // Date of birth – must be at least 18 years old
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!formData.dateOfBirth.isValid()) {
      newErrors.dateOfBirth = 'Enter a valid date';
    } else {
      const age = dayjs().diff(formData.dateOfBirth, 'year');
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Build the payload – serialise dateOfBirth as ISO string
      const payload = {
        password: formData.password,
        phone_number: formData.phone_number.trim(),
        city: formData.city.trim(),
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth!.format('YYYY-MM-DD'),
        googleId: formData.googleId,
        email: formData.email,
        full_name: formData.full_name,
      };

      
      console.log('Submitting payload:', payload);
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/complete-profile", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type" : "application/json", 
          },
          body: JSON.stringify(payload, null, 2)
        })

        const data = await response.json()
        console.log("response Data: ", data);

        if(response.ok){
          console.log("Successful Response!")
          setAccessToken(data.accessToken)
          setSnackbar({ open: true, message: data.message, severity: 'success' });
          router.push(`/dashboard?id=${encodeURIComponent(data.account.userId)}`)
        }else{
          console.log("Else block hit in response!")
          setSnackbar({
            open: true,
            message: data?.message || 'Something went wrong. Please try again.',
            severity: 'error',
          });
        }

      } catch (error) {
        console.error("Error in completing account: ", error);
        setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error',
      });
      }
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.message || 'Something went wrong. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #FBF8F6 0%, #E8E0D8 100%)'
              : 'linear-gradient(135deg, #231A1A 0%, #1A1212 100%)',
          py: 4,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 10px 40px rgba(140, 41, 57, 0.08)'
                  : '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  letterSpacing: '-0.02em',
                }}
              >
                Complete Your Profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Just a few more details to get you started on your journey.
              </Typography>
            </Box>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone_number}
                    onChange={handleChange}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    name="city"
                    label="City"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Gender"
                      value={formData.gender}
                      onChange={handleGenderChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Person color="action" sx={{ ml: 1, mr: -0.5 }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    sx={{ width: '100%' }}
                    slots={{
                      openPickerIcon: CalendarMonth,
                    }}
                    slotProps={{
                      textField: {
                        error: !!errors.dateOfBirth,
                        helperText: errors.dateOfBirth,
                      },
                    }}
                  />
                </Grid>

                <Grid size={12} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 14px 0 rgba(140, 41, 57, 0.39)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(140, 41, 57, 0.23)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={26} color="inherit" /> : 'Complete Account'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* ── Feedback snackbar ────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default CompleteAccount;