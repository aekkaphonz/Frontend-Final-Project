"use client";

import React, { useState } from "react";
import {
  Container,
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AddCircle as AddCircleIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const themeColors = {
  primary: "#77bfa3",
  secondary: "#98c9a3",
  background: "#dde7c7",
  hover: "#bfd8bd",
  text: "#edeec9",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: "500px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const pages = ["สร้าง"];

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        // ตรวจสอบชนิดของ event
        if (
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        setDrawerOpen(open);
      };


  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: themeColors.primary }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Menu Button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home/highlights"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                color: themeColors.text,
                textDecoration: "none",
              }}
            >
              App Block
            </Typography>
            {/* Search Bar */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* Create Button */}
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    my: 2,
                    color: themeColors.text,
                    display: "block",
                    "&:hover": { bgcolor: themeColors.hover },
                  }}
                >
                  <AddCircleIcon sx={{ mr: 1 }} />
                  {page}
                </Button>
              ))}
            </Box>
            {/* Login/Register Buttons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  color: themeColors.text,
                  borderColor: themeColors.text,
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: alpha(themeColors.text, 0.1),
                    borderColor: themeColors.text,
                  },
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: themeColors.background,
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: themeColors.primary }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            <ListItem
              component="a"
              href="/home/highlights"
              sx={{
                "&:hover": { bgcolor: themeColors.hover },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="หน้าหลัก" />
            </ListItem>

            <ListItem
              component="a"
              href="/home/feed"
              sx={{
                "&:hover": { bgcolor: themeColors.hover },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="หน้าฟีด" />
            </ListItem>
            <ListItem
              component="a"
               href="/home/popular"
              sx={{
                "&:hover": { bgcolor: themeColors.hover },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="ยอดนิยม" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default ResponsiveAppBar;
