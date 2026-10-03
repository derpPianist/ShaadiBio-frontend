"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  interface Profile {
    id: string;
    userid: string;
    name: string;
    gender: string;
    DOB: string;
    occupation: string;
    income?: string;
    education: string;
    fathers_name?: string;
    fathers_occupation?: string;
    mothers_name?: string;
    mothers_occupation?: string;
    no_of_siblings?: number;
    contact_number: string;
    contact_email: string;
    image_url: string;
  }

  const [loading, setLoading] = useState(false); // todo: change to false after completion
  const [profilesInfo, setProfilesInfo] = useState<Profile[]>([]);
  const { accessToken, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/");
    }
  }, [authenticated]);

  useEffect(() => {
    const fetchProfilesInfo = async () => {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/v1/profile/get-profile",
        {
          method: "GET",
          credentials: "include",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await res.json();

      console.log("profiles_data: ", data);

      setProfilesInfo(data.profiles);
      setLoading(false);
    };

    fetchProfilesInfo();
  }, []);

  //Todo: Remove after completion
  useEffect(() => {
    console.log("Changed profiles data: ", profilesInfo);
  }, [profilesInfo]);

  return (
    <>
      {authenticated && !loading ? (
        <>
          {profilesInfo ? (
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
                <Card sx={{ bgcolor: "background.paper", borderRadius: 3 }} onClick={()=>{router.replace('/create-profile')}}>
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
        <CircularProgress aria-label="Loading…" />
      )}
    </>
  );
};

export default Dashboard;
