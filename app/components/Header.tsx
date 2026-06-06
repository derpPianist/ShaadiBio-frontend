"use client";

import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../theme/ThemeRegistry";
import Image from "next/image";
import NextLink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { AccountCircle } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

const navItems = ["Home", "About Us", "Membership", "Contact"];

export default function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const pathname = usePathname();
  const isVerifyOtp = pathname === "/verify-otp";

  const { accessToken, logout } = useAuth();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    const res = await logout();

    if (res.message === "Logged out successfully") {
      router.push("/login");
    }
  };

  return accessToken ? (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      sx={{ zIndex: 10, px: { xs: 2, md: 6 }, py: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/images/logo.png"
            alt="Shaadi Bio"
            width={32}
            height={32}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: theme.palette.text.primary,
            }}
          >
            ShaadiBio
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <LightModeIcon sx={{ color: theme.palette.text.primary }} />
            ) : (
              <DarkModeIcon sx={{ color: theme.palette.text.primary }} />
            )}
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      sx={{ zIndex: 10, px: { xs: 2, md: 6 }, py: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src="/images/logo.png"
              alt="Shaadi Bio"
              width={32}
              height={32}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: theme.palette.text.primary,
              }}
            >
              ShaadiBio
            </Typography>
          </Box>
        </Link>

        {!isVerifyOtp && (
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  textTransform: "none",
                }}
                component={NextLink}
                href="/"
              >
                {item}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <LightModeIcon sx={{ color: theme.palette.text.primary }} />
            ) : (
              <DarkModeIcon sx={{ color: theme.palette.text.primary }} />
            )}
          </IconButton>

          {!isVerifyOtp && (
            <>
              <Button
                component={NextLink}
                href="/login"
                sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
              >
                Log In
              </Button>
              <Button
                component={NextLink}
                href="/signup"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
