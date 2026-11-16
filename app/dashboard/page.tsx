"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { Profile } from "@/features/biodata/types";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { selectProfile } from "@/store/profilesSlice";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [profilesInfo, setProfilesInfo] = useState<Profile[]>([]);
  const { accessToken, authenticated, checkTokenAndFetch } = useAuth();
  const router = useRouter();
  const [snack, setSnack] = useState({ open: false, message: "" });
  const [loadFailed, setLoadFailed] = useState(false);

  const showError = (message: string) => {
    setLoadFailed(true);
    setSnack({ open: true, message });
  };

  const closeSnack = (_: unknown, reason?: string) => {
    if (reason === "clickaway") return; // stray clicks shouldn't dismiss it
    setSnack((s) => ({ ...s, open: false }));
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/");
    }
  }, [authenticated]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchProfilesInfo = async () => {
      setLoading(true);
      setLoadFailed(false);
      try {
        // const res = await fetch(
        //   "http://localhost:5000/api/v1/profile/get-profile",
        //   {
        //     method: "GET",
        //     credentials: "include",
        //     headers: { authorization: `Bearer ${accessToken}` },
        //   },
        // );

        // if (!res.ok) {
        //   showError(
        //     res.status === 401
        //       ? "Your session has expired. Please log in again."
        //       : "Couldn't load your profiles. Please try again.",
        //   );
        //   return;
        // }

        const res = await checkTokenAndFetch(
          "http://localhost:5000/api/v1/profile/get-profile",
          "GET",
        );

        console.log("API response: ", res);

        if (res) {
          const data = await res.json();

          console.log("Data after formatting: ", data);

          setProfilesInfo(Array.isArray(data.profiles) ? data.profiles : []);
        }
      } catch {
        showError(
          "Couldn't reach the server. Check your connection and try again.",
        );
      } finally {
        setLoading(false); // runs on success, failure and exceptions alike
      }
    };

    fetchProfilesInfo();
  }, [accessToken]);

  return (
    <>
      {authenticated && !loading ? (
        <>
          {profilesInfo.length > 0 ? (
            <div className="w-full min-h-screen py-20 px-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 max-w-7xl mx-auto">
                {profilesInfo.map((profile: Profile) => (
                  <Card
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={profile.id}
                  >
                    <CardActionArea
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        height: "100%",
                      }}
                      component={Link}
                      href={`/biodata/${profile.id}`}
                      onClick={() => dispatch(selectProfile(profile))}
                    >
                      <CardMedia
                        component="img"
                        image={profile.image_url}
                        alt={profile.name}
                        sx={{
                          height: 220, // fixed crop height, same for every card
                          width: "100%",
                          objectFit: "cover", // crops to fill the box instead of distorting
                          objectPosition: "center top", // keeps faces near the top in frame
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <h1 className="text-center">{profile.name}</h1>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
                <Card
                  sx={{ bgcolor: "background.paper", borderRadius: 3 }}
                  onClick={() => {
                    router.push("/create-profile");
                  }}
                >
                  <CardActionArea
                    sx={{
                      minHeight: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ControlPointSharpIcon sx={{ fontSize: 60 }} />
                      </Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Create a new profile
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 220 }}
                      >
                        Get started by adding your biodata details
                      </Typography>
                    </Stack>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          ) : loadFailed ? (
            <div className="min-h-screen w-full flex justify-center items-center">
              <Typography color="text.secondary">
                We couldn't load your profiles.
              </Typography>
            </div>
          ) : (
            <div className="min-h-screen w-full flex justify-center items-center p-2.5">
              <Card
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 3,
                  maxWidth: 320,
                }}
              >
                <CardActionArea
                  sx={{
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ControlPointSharpIcon sx={{ fontSize: 60 }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Create your first profile
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ maxWidth: 220 }}
                    >
                      Get started by adding your biodata details
                    </Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </div>
          )}
        </>
      ) : (
        <div className="min-h-screen w-full flex justify-center items-center">
          <CircularProgress aria-label="Loading…" />
        </div>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
