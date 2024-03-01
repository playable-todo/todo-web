import React, { useState, MouseEvent, useEffect } from 'react';

// Material UI elements
import { 
    Grid, 
    Box, 
    Button, 
    AppBar, 
    Toolbar, 
    IconButton, 
    MenuItem, 
    Container, 
    Paper, 
    Drawer, 
    Menu, 
    Tooltip, 
    Divider,
    Avatar,
    ListItemAvatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    InputBase,
    Typography,
    useTheme
  } from "@mui/material"

// Material UI Icons
import { 
    SearchOutlined, 
    LocationOn, 
    CameraAlt, 
    Close, 
    Favorite, 
    Message, 
    Help, 
    Face2,
    Sms, 
    Notifications,
    ExpandMore,
    Logout, 
    ArrowBack,
    Settings,
    Menu as MenuIcon } from '@mui/icons-material';

// Material UI styles
import { navbarStyles } from '../styles';

// React Router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import store,{ removeAllData} from '../redux/store';
import { LoginData } from '../redux/interface';

// Components
import SearchBar from '../components/SearchBar';

// Assets
import LogoImage from '../assets/logo.png'

const Navbar = () => {
  const theme = useTheme();
   // Redux
  const loginData = store.getState().authUser?.loginData;

   // useState elements
  const [mobileNav, setMobileNav] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<LoginData>({});

  /*
        Gets user data in redux state
    */
    useEffect(() => {
        if(loginData){
            setUserData(loginData)
        }
    },[loginData])

  const openMobileMenu = (event: MouseEvent<HTMLElement>) => {
    setMobileNav(event.currentTarget);
  }
  const closeMobileMenu = () => {
      setMobileNav(null)
  }

  const LogoComponent = () => (
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Box sx={{ display :'flex' }}>
            <IconButton
                size='small'
                edge='start'
                color="inherit"
                aria-label="logo"
            >
                <img src={LogoImage} width={'40'} height={'48'} />
            </IconButton>
            <Typography 
                sx={{
                  marginTop: 2, 
                  color: theme.palette.warning.main,
                  fontWeight: 600
                }}>To do</Typography>
          </Box>
      </Link>
  )


  return (
    <AppBar position="sticky" sx={navbarStyles.appBar}>
      <Container maxWidth='lg' sx={navbarStyles.container}>
          {/* Desktop navbar */}

          <Toolbar sx={navbarStyles.toolbar}> 
              <Grid container>
                  <Grid item xl={2} lg={2} md={2} sm={6}>
                      <LogoComponent/>
                  </Grid>
                  <Grid item xl={10} lg={10} md={10} sm={6}>
                    <Box sx={{ marginTop: 1.4 }}>
                        <SearchBar device="desktop" />
                    </Box>
                </Grid>
              </Grid>
          </Toolbar>
         
          {/* Mobile navbar */}
          <Toolbar sx={navbarStyles.mobileToolbar}>
              <Grid container>
                  <Grid item xs={6}>
                      <LogoComponent />
                  </Grid>
                  <Grid item xs={6}>
                      <Box sx={{ float : 'right'}}>
                            <IconButton size='small' edge='start' onClick={openMobileMenu}>
                                <MenuIcon sx={navbarStyles.mobileNavbarHamburgerMenuIcon} />
                            </IconButton>
                            <Drawer
                                anchor={'top'}
                                open={Boolean(mobileNav)}
                                onClose={closeMobileMenu}
                                PaperProps={{
                                    sx: {
                                        height: '100%',
                                        maxHeight: 'none',
                                    },
                                }}
                            >
                                <Container>
                                    <Grid container>
                                        <Grid item xl={12} md={12} sm={12} xs={12}>
                                            <Grid container>
                                                <Grid item xs={11}>
                                                    <LogoComponent />
                                                </Grid>
                                                <Grid item xs={1} sx={navbarStyles.drawerCloseIconGrid}>
                                                    <IconButton size='medium' edge='start' onClick={closeMobileMenu}>
                                                        <Close sx={navbarStyles.drawerCloseIcon} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Drawer>
                        </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <SearchBar device="mobile" />
                  </Grid>
              </Grid>
          </Toolbar>
      </Container>
  </AppBar >
  )
}

export default Navbar