"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ImageCropper from "../components/ImageCropper";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

const CreateProfile = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null); //save cropped img url used for preview
  const [avatarFile, setAvatarFile] = useState<Blob | null>(null); //to be uploaded to server
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { accessToken, authenticated } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState('');
  const [snackbarError, setSnackbarError] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    DOB: "", //
    complexion: "", //
    occupation: "", //
    education: "", //
    income: "", //
    fathers_name: "", //
    mothers_name: "", //
    fathers_occupation: "", //
    mothers_occupation: "", //
    no_of_siblings: "", //
    contact_person: "", //
    contact_number: "", //
    contact_email: "", //
    residential_address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.DOB) newErrors.DOB = "Date of birth is required";
    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.contact_person.trim())
      newErrors.contact_person = "Contact person is required";
    if (!formData.contact_number.trim())
      newErrors.contact_number = "Contact number is required";
    if (!formData.contact_email.trim())
      newErrors.contact_email = "Contact email is required";
    if (!formData.complexion) newErrors.complexion = "Please add complexion";
    if (!formData.education)
      newErrors.education = "Please add latest education details";
    if (!formData.income) newErrors.income = "Please add income details";
    if (!formData.fathers_name.trim())
      newErrors.fathers_name = "Please add father's name";
    if (!formData.mothers_name.trim())
      newErrors.mothers_name = "Please add mother's name";
    if (!formData.fathers_occupation.trim())
      newErrors.fathers_occupation = "Please add father's occupation details";
    if (!formData.mothers_occupation.trim())
      newErrors.mothers_occupation = "Please add mother's occupation details";
    if (!formData.no_of_siblings)
      newErrors.no_of_siblings = "Please select no of siblings";
    if (!avatarFile) newErrors.photo = "Please upload a photograph";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const updateAvatar = (imgSrc: string, imgBlob: Blob): void => {
    if (imgSrc && imgBlob) {
      setAvatarSrc(imgSrc);
      setAvatarFile(imgBlob);
      setErrors((prev) => ({ ...prev, photo: "" }));
      handleClose();
    }
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); //stops a full reload of the page from happenning when submitting a form

    console.log("HandleSubmit Activated");
    const isValid = validate();
    if (!isValid) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (avatarFile) {
      payload.append("avatar", avatarFile, "avatar.jpg");
    }

    for (const [key, value] of payload.entries()) {
      console.log(key, ":", value);
    }

    let error = "";

    const res = await fetch(
      "http://localhost:5000/api/v1/profile/create-profile",
      {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: payload,
      },
    );

    console.log("Res: ", res);
    const data = await res.json();

    if (res.status === 201) {
      console.log("New Profile Created: ", data);
      setSubmissionResult(true)
      setSnackbarSuccess(data.message)
      setOpenSnackbar(true);
      setTimeout(()=>{
        router.replace('/')
      }, 3000)
      //setOpenSnackbar(false)
    } else {
      setSnackbarError(data.message)
      setOpenSnackbar(true);
      setTimeout(()=>{
        router.replace('/')
      }, 3000)
      //setOpenSnackbar(false)
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!authenticated) {
      router.replace("/");
    }
  }, [authenticated]);

  useEffect(() => {
    if (avatarFile) {
      console.log("New Img: ", avatarFile);
    }
  }, [avatarSrc]);

  useEffect(() => {
    console.log("DOB: ", formData.DOB);
  }, [formData.DOB]);

  return (
    <>
      {authenticated ? (
        <>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: isDark ? "#121212" : "#f5f5f7",
              pt: 10,
              px: 9,
            }}
          >
            <Box
              sx={{
                width: "100%",
                bgcolor: isDark ? "#1e1e1e" : "#fff",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: isDark
                  ? "0 10px 40px rgba(0,0,0,0.3)"
                  : "0 10px 40px rgba(0,0,0,0.08)",
                my: "20px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  px: { xs: 2, md: 50 },
                  py: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  bgcolor: isDark ? "#1e1e1e" : "#fafafa",
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
                  Create a new Profile
                </Typography>

                {/* Form for Profile */}
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: "10px",
                  }}
                  onSubmit={handleSubmit}
                >
                  {/*Full Name */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Full Name
                    </Typography>
                    <TextField
                      placeholder="Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange("fullName")}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                    />
                  </Box>

                  {/* Gender */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Gender
                    </Typography>
                    <FormControl fullWidth error={!!errors.gender}>
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
                            borderRadius: 2,
                          }, //used to style the border of an outlined field component
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& .MuiMenuItem-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#444" : "#e0e0e0",
                                },
                              },
                            },
                          },
                        }} //customize the menu items
                      >
                        <MenuItem value="" disabled>
                          Select Your Gender
                        </MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                      {errors.gender && (
                        <FormHelperText>{errors.gender}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* Date of Birth */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Date of Birth
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        maxDate={dayjs().subtract(18, "year")}
                        value={formData.DOB ? dayjs(formData.DOB) : null}
                        onChange={(newValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            DOB: newValue ? newValue.format("YYYY-MM-DD") : "",
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
                            variant: "outlined",
                            error: !!errors.DOB,
                            helperText: errors.DOB,
                            sx: {
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                                "& .MuiInputBase-input": {
                                  backgroundColor: isDark ? "#2e2e2e" : "#fff",
                                },
                                backgroundColor: `${isDark ? "#2e2e2e" : "#fff"} !important`,
                                paddingLeft: "12px",
                                "& fieldset": {
                                  borderColor: isDark ? "#444" : "#dcdcdc",
                                },
                              },
                            },
                          },
                          popper: {
                            //actual component when calendar opens
                            sx: {
                              "& .MuiPaper-root": {
                                bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              },
                              "& .MuiPickersDay-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#555" : "#1976d2",
                                  color: "#fff",
                                },
                              },
                              "& .MuiPickersCalendarHeader-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                              },
                              "& .MuiDayCalendar-weekDayLabel": {
                                color: isDark ? "#999" : "#666",
                              },
                              "& .MuiIconButton-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>

                  {/* Complexion */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Complexion
                    </Typography>
                    <FormControl fullWidth error={!!errors.complexion}>
                      <Select
                        value={formData.complexion}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            complexion: e.target.value,
                          }))
                        }
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                          "& fieldset": {
                            borderColor: isDark ? "#444" : "#dcdcdc",
                            borderRadius: 2,
                          }, //used to style the border of an outlined field component
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& .MuiMenuItem-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#444" : "#e0e0e0",
                                },
                              },
                            },
                          },
                        }} //customize the menu items
                      >
                        <MenuItem value="" disabled>
                          Choose a complexion
                        </MenuItem>
                        <MenuItem value="fair">Fair</MenuItem>
                        <MenuItem value="wheatish">Wheatish</MenuItem>
                        <MenuItem value="dusky">Dusky</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                      </Select>
                      {errors.complexion && (
                        <FormHelperText>{errors.complexion}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* Occupation */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Occupation
                    </Typography>
                    <TextField
                      value={formData.occupation}
                      onChange={handleChange("occupation")}
                      placeholder="State your profession"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.occupation}
                      helperText={errors.occupation}
                    />
                  </Box>

                  {/* Education */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Education
                    </Typography>
                    <FormControl fullWidth error={!!errors.education}>
                      <Select
                        value={formData.education}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            education: e.target.value,
                          }))
                        }
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                          "& fieldset": {
                            borderColor: isDark ? "#444" : "#dcdcdc",
                            borderRadius: 2,
                          }, //used to style the border of an outlined field component
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& .MuiMenuItem-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#444" : "#e0e0e0",
                                },
                              },
                            },
                          },
                        }} //customize the menu items
                      >
                        <MenuItem value="" disabled>
                          Select your highest education level
                        </MenuItem>
                        <MenuItem value="Matriculation">Matriculation</MenuItem>
                        <MenuItem value="Higher-Secondary">
                          Higher-Secondary
                        </MenuItem>
                        <MenuItem value="Graduate">Graduate</MenuItem>
                        <MenuItem value="Post-Graduate">Post-Graduate</MenuItem>
                        <MenuItem value="PhD">PhD</MenuItem>
                      </Select>
                      {errors.education && (
                        <FormHelperText>{errors.education}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* Income */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Income
                    </Typography>
                    <FormControl fullWidth error={!!errors.income}>
                      <Select
                        value={formData.income}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            income: e.target.value,
                          }))
                        }
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                          "& fieldset": {
                            borderColor: isDark ? "#444" : "#dcdcdc",
                            borderRadius: 2,
                          }, //used to style the border of an outlined field component
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& .MuiMenuItem-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#444" : "#e0e0e0",
                                },
                              },
                            },
                          },
                        }} //customize the menu items
                      >
                        <MenuItem value="" disabled>
                          Choose an income level
                        </MenuItem>
                        <MenuItem value="0-5L">0-5L</MenuItem>
                        <MenuItem value="5-10L">5-10L</MenuItem>
                        <MenuItem value="10-20L">10-20L</MenuItem>
                        <MenuItem value="20-50L">20-50L</MenuItem>
                        <MenuItem value="50L+">50L+</MenuItem>
                        <MenuItem value="Not Disclosed">
                          Prefer not to disclose
                        </MenuItem>
                      </Select>
                      {errors.income && (
                        <FormHelperText>{errors.income}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* Father's Name */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Father's Name
                    </Typography>
                    <TextField
                      value={formData.fathers_name}
                      onChange={handleChange("fathers_name")}
                      placeholder="Enter Your Father's Name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.fathers_name}
                      helperText={errors.fathers_name}
                    />
                  </Box>

                  {/* Mother's Name */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Mother's Name
                    </Typography>
                    <TextField
                      value={formData.mothers_name}
                      onChange={handleChange("mothers_name")}
                      placeholder="Enter Your Mother's Name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.mothers_name}
                      helperText={errors.mothers_name}
                    />
                  </Box>

                  {/* Fathers Occupation */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Father's Occupation
                    </Typography>
                    <TextField
                      value={formData.fathers_occupation}
                      onChange={handleChange("fathers_occupation")}
                      placeholder="Enter Your Father's Occupation"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.fathers_occupation}
                      helperText={errors.fathers_occupation}
                    />
                  </Box>

                  {/* Mother's Occupation */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Mother's Occupation
                    </Typography>
                    <TextField
                      value={formData.mothers_occupation}
                      onChange={handleChange("mothers_occupation")}
                      placeholder="Enter Your Mother's Occupation"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.mothers_occupation}
                      helperText={errors.mothers_occupation}
                    />
                  </Box>

                  {/* Number of siblings */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Number of Siblings
                    </Typography>
                    <FormControl fullWidth error={!!errors.no_of_siblings}>
                      <Select
                        value={formData.no_of_siblings}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            no_of_siblings: e.target.value,
                          }))
                        }
                        displayEmpty
                        sx={{
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                          "& fieldset": {
                            borderColor: isDark ? "#444" : "#dcdcdc",
                            borderRadius: 2,
                          }, //used to style the border of an outlined field component
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                              "& .MuiMenuItem-root": {
                                color: isDark ? "#e0e0e0" : "#1a1a1a",
                                "&:hover": {
                                  bgcolor: isDark ? "#3a3a3a" : "#f0f0f0",
                                },
                                "&.Mui-selected": {
                                  bgcolor: isDark ? "#444" : "#e0e0e0",
                                },
                              },
                            },
                          },
                        }} //customize the menu items
                      >
                        <MenuItem value="" disabled>
                          Number of siblings
                        </MenuItem>
                        <MenuItem value="0">0</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="5+">5+</MenuItem>
                      </Select>
                      {errors.no_of_siblings && (
                        <FormHelperText>{errors.no_of_siblings}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>

                  {/* Contact Person */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Contact Person
                    </Typography>
                    <TextField
                      value={formData.contact_person}
                      onChange={handleChange("contact_person")}
                      placeholder="Enter Contact person name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.contact_person}
                      helperText={errors.contact_person}
                    />
                  </Box>

                  {/* Contact Number */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Contact Number
                    </Typography>
                    <TextField
                      placeholder="Enter Contact person Number"
                      value={formData.contact_number}
                      onChange={handleChange("contact_number")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.contact_number}
                      helperText={errors.contact_number}
                    />
                  </Box>

                  {/* Contact Email */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Contact Email
                    </Typography>
                    <TextField
                      value={formData.contact_email}
                      onChange={handleChange("contact_email")}
                      placeholder="Enter Contact person email"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                          borderColor: isDark ? "#444" : "#dcdcdc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: isDark ? "#666" : "#bdbdbd",
                        },
                      }}
                      error={!!errors.contact_email}
                      helperText={errors.contact_email}
                    />
                  </Box>

                  {/* Residential Address */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Residential Address
                    </Typography>
                    <TextField
                      value={formData.residential_address}
                      onChange={handleChange("residential_address")}
                      placeholder="Address"
                      multiline
                      minRows={3}
                      maxRows={8}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: isDark ? "#2e2e2e" : "#ffffff",
                          alignItems: "flex-start", // keeps label/icon aligned to top instead of vertically centering against a tall box
                        },
                        "& fieldset": {
                          borderColor: isDark ? "#444" : "#dcdcdc",
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>

                  {/* Image upload and crop */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: isDark ? "#ccc" : "#333" }}
                    >
                      Upload Photograph
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                      }}
                    >
                      {errors.photo && (
                        <FormHelperText error>{errors.photo}</FormHelperText>
                      )}
                      <Button onClick={handleOpen}>
                        Upload and Edit Photo
                      </Button>
                      <Modal
                        open={open}
                        //onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 1000,
                            height: 700,
                            bgcolor: "#121212",
                            border: "2px solid #000",
                            borderRadius: 1,
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <div className="px-5 py-4">
                            <button
                              type="button"
                              className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                              onClick={handleClose}
                            >
                              <CloseIcon />
                            </button>
                            <ImageCropper updateAvatar={updateAvatar} />
                          </div>
                        </Box>
                      </Modal>
                      {avatarSrc && (
                        <img
                          src={avatarSrc}
                          alt="debug preview"
                          style={{
                            width: 150,
                            height: 150,
                            border: "3px solid green",
                            display: "block",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{
                          bgcolor: "#6A1B29",
                          color: "#ffffff",
                          "&:hover": { bgcolor: "#52141f" },
                        }}
                        type="submit"
                      >
                        Create Your Profile
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={submissionResult ? snackbarSuccess : snackbarError}
            action={action}
          />
        </>
      ) : (
        <CircularProgress aria-label="Loading…" />
      )}
    </>
  );
};

export default CreateProfile;
