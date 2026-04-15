"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function SignupPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    gender: "female",
    date_of_birth: "",
    city: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrorText("Passwords do not match");
      return;
    }
    setErrorText("");

    // Construct exactly matching payload
    const payload = {
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      phone_number: formData.phone_number,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      city: formData.city,
    };

    console.log("Submit Payload:", JSON.stringify(payload, null, 2));
    alert("Check console for JSON payload!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: isDark ? "#121212" : "#f5f5f7",
        pt: 10,
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: 1100,
            bgcolor: isDark ? "#1e1e1e" : "#fff",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.3)"
              : "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Left Side - Image Background */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              position: "relative",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url(/images/bg2.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
              }}
            />
          </Box>

          {/* Right Side - Signup Form */}
          <Box
            sx={{
              width: { xs: "100%", md: "55%" },
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: isDark ? "#1e1e1e" : "#fafafa", // Light grey so white inputs pop
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                color: isDark ? "#fff" : "#1a1a1a",
              }}
            >
              Create Your Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: isDark ? "#aaa" : "#666", mb: 4 }}
            >
              Please fill in your details to start your journey.
            </Typography>

            {/* Form Fields container */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Full Name */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="Enter full name"
                    variant="outlined"
                    value={formData.full_name}
                    onChange={handleChange("full_name")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            sx={{ color: isDark ? "#777" : "#999" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Email */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    placeholder="Enter email address"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange("email")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AlternateEmailIcon
                            sx={{ color: isDark ? "#777" : "#999" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Phone */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="Enter phone number"
                    variant="outlined"
                    value={formData.phone_number}
                    onChange={handleChange("phone_number")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: isDark ? "#777" : "#999" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* City */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    City
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="Enter city"
                    variant="outlined"
                    value={formData.city}
                    onChange={handleChange("city")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon
                            sx={{ color: isDark ? "#777" : "#999" }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Gender */}
                <FormControl required fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Gender
                  </Typography>
                  <Select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    displayEmpty
                    sx={{
                      borderRadius: 2,
                      bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                      "& fieldset": {
                        borderColor: isDark ? "#444" : "#dcdcdc",
                      },
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Date of Birth */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Date of Birth
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      maxDate={dayjs().subtract(18, "year")}
                      value={
                        formData.date_of_birth
                          ? dayjs(formData.date_of_birth)
                          : null
                      }
                      onChange={(newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          date_of_birth: newValue
                            ? newValue.format("YYYY-MM-DD")
                            : "",
                        }));
                      }}
                      slots={{
                        openPickerIcon: () => (
                          <CalendarMonthIcon
                            sx={{ color: isDark ? "#777" : "#999" }}
                          />
                        ),
                      }}
                      slotProps={{
                        inputAdornment: {
                          position: "start",
                        },
                        textField: {
                          fullWidth: true,
                          required: true,
                          variant: "outlined",
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& fieldset": {
                                borderColor: isDark ? "#444" : "#dcdcdc",
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Password */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon
                                sx={{ color: isDark ? "#777" : "#999" }}
                              />
                            ) : (
                              <VisibilityIcon
                                sx={{ color: isDark ? "#777" : "#999" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Confirm Password */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: isDark ? "#ccc" : "#333",
                    }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    variant="outlined"
                    value={formData.confirm_password}
                    onChange={handleChange("confirm_password")}
                    error={!!errorText}
                    helperText={errorText}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOffIcon
                                sx={{ color: isDark ? "#777" : "#999" }}
                              />
                            ) : (
                              <VisibilityIcon
                                sx={{ color: isDark ? "#777" : "#999" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", ml: -1 }}>
                <Checkbox
                  inputProps={{ required: true }}
                  sx={{
                    color: isDark ? "#555" : "#ccc",
                    "&.Mui-checked": { color: isDark ? "#ff4d6d" : "#762029" },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#bbb" : "#555" }}
                >
                  <span style={{ color: "#d32f2f" }}>*</span> I agree to the{" "}
                  <MuiLink
                    href="#"
                    sx={{
                      color: isDark ? "#ff4d6d" : "#762029",
                      fontWeight: 600,
                    }}
                  >
                    Terms of Service
                  </MuiLink>{" "}
                  and{" "}
                  <MuiLink
                    href="#"
                    sx={{
                      color: isDark ? "#ff4d6d" : "#762029",
                      fontWeight: 600,
                    }}
                  >
                    Privacy Policy
                  </MuiLink>
                  .
                </Typography>
              </Box>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                sx={{
                  bgcolor: "#6A1B29",
                  color: "#fff",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  mt: 2,
                  "&:hover": { bgcolor: "#52141f" },
                }}
              >
                Create Account
              </Button>
            </Box>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: isDark ? "#aaa" : "#555" }}
              >
                Already have an account?{" "}
                <MuiLink
                  component={MuiLink}
                  href="/login"
                  underline="hover"
                  sx={{
                    color: isDark ? "#ff4d6d" : "#5E1A24",
                    fontWeight: 700,
                  }}
                >
                  Log In
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderTop: `1px solid ${isDark ? "#333" : "#e0e0e0"}`,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: isDark ? "#777" : "#888", mb: { xs: 2, sm: 0 } }}
        >
          © 2024 Shadi Ki Baat. Made with ❤️ for lasting bonds.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <MuiLink
            href="#"
            underline="hover"
            sx={{ color: isDark ? "#999" : "#888", fontSize: "0.875rem" }}
          >
            Privacy Policy
          </MuiLink>
          <MuiLink
            href="#"
            underline="hover"
            sx={{ color: isDark ? "#999" : "#888", fontSize: "0.875rem" }}
          >
            Terms of Service
          </MuiLink>
          <MuiLink
            href="#"
            underline="hover"
            sx={{ color: isDark ? "#999" : "#888", fontSize: "0.875rem" }}
          >
            Contact Us
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}
