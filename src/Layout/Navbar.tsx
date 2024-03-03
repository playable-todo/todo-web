import React, { useState, MouseEvent, useEffect } from 'react';

// Material UI elements
import { 
    Grid, 
    Box, 
    AppBar, 
    Toolbar, 
    IconButton, 
    MenuItem, 
    Container, 
    Drawer, 
    Menu, 
    Divider,
    Avatar,
    ListItemAvatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    Link
  } from "@mui/material"

// Material UI Icons
import { 
    Close, 
    ExpandMore,
    Logout, 
    List as ListIcon,
    Menu as MenuIcon } from '@mui/icons-material';

// Material UI styles
import { navbarStyles } from '../styles';

// Assets
import LogoImage from '../assets/logo.png'

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import store,{ removeAllData } from '../redux/store';

// Helpers
import { Request } from '../helpers/Request';

// Components
import SearchBar from '../components/SearchBar';

// İnterfaces
import { LoginData } from '../redux/interface';

const Navbar = () => {
    // Material UI and react router
    const theme = useTheme();
    const navigate = useNavigate()

    // Redux
    const loginData = store.getState().authUser?.loginData;

    // useState elements
    const [mobileNav, setMobileNav] = useState<null | HTMLElement>(null);
    const [userData, setUserData] = useState<LoginData>({});
    const [profilePopover, setProfilePopover] = useState<null | HTMLElement>(null);

    /*
        Gets user data in redux state
    */
    useEffect(() => {
        if(loginData){
            setUserData(loginData)
        }
    },[loginData])

    // Functions

    // Profile avatar Menu
    const LoginOpen = Boolean(profilePopover);

    const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfilePopover(event.currentTarget);
    };
    const handleProfileClose = () => {
        setProfilePopover(null);
    };

    // Mobile navbar 
    const openMobileMenu = (event: MouseEvent<HTMLElement>) => {
        setMobileNav(event.currentTarget);
    }
    const closeMobileMenu = () => {
        setMobileNav(null)
    }

    // logo section
    const LogoComponent = () => (
        <Link href="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display :'flex' }}>
            <img src={LogoImage} width={'40'} height={'48'} />
                <Typography 
                    sx={{
                    marginTop: 1.6,
                    marginLeft: 1,
                    color: theme.palette.warning.main,
                    fontWeight: 600
                    }}>To do</Typography>
            </Box>
        </Link>
    )
    
    // User Avatar
    const UserAvatar = () => (
        <Avatar sx={navbarStyles.authAvatar}>{userData.fullname ? userData?.fullname!.charAt(0) : ''}</Avatar>
    )

    // Logout
    const handlelogout = async() => {
        const url = "/oauth/logout";
        const result = await Request({
            method: 'GET',
            url: url
        });

        if(result){
            removeAllData();
            navigate('/');
            location.reload()
        }
    }

  return (
    <AppBar position="sticky" sx={navbarStyles.appBar}>
      <Container maxWidth='lg' sx={navbarStyles.container}>
          {/* Desktop navbar section start */}
          <Toolbar sx={navbarStyles.toolbar}> 
              <Grid container>
                    <Grid item xl={2} lg={2} md={2} sm={6}>
                        <LogoComponent/>
                    </Grid>
                    <Grid item xl={8} lg={8} md={8} sm={6}>
                            <SearchBar device="desktop" />
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={6}>
                        <IconButton
                            onClick={handleProfileOpen}
                            size="small"
                            sx={navbarStyles.authAvatarIconButton}
                            aria-controls={LoginOpen ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={LoginOpen ? 'true' : undefined}
                        >
                            <Avatar sx={navbarStyles.authAvatar}>{userData.fullname ? userData?.fullname!.charAt(0) : ''}</Avatar>
                            <ExpandMore />
                        </IconButton>
                        <Menu
                            anchorEl={profilePopover}
                            id="account-menu"
                            open={LoginOpen}
                            onClose={handleProfileOpen}
                            onClick={handleProfileClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            
                            <MenuItem onClick={handleProfileClose}>
                                <UserAvatar />
                                <Typography sx={navbarStyles.authMenuAvatarText}>{userData?.fullname}</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => { 
                                handleProfileClose();
                                handlelogout();
                            }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Çıkış
                            </MenuItem>
                        </Menu>
                    </Grid>
              </Grid>
          </Toolbar>
          {/* Desktop navbar section end */}

          {/* Mobile navbar section start */}
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
                                            <List sx={navbarStyles.drawerMenuList} aria-label="contacts">
                                                <ListItem sx={navbarStyles.drawerMobileAvatarListItem}>
                                                    <ListItemAvatar>
                                                        <UserAvatar />
                                                    </ListItemAvatar>
                                                    <Typography
                                                        sx={navbarStyles.drawerAvatarLoginText}
                                                    >{userData?.fullname}</Typography>
                                                </ListItem>
                                            </List>
                                            <Divider />
                                            <ListItem disablePadding>
                                                <ListItemButton 
                                                    sx={navbarStyles.drawerMenuListItemButton}
                                                    onClick={() => navigate('/')}
                                                >
                                                        <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                            <ListIcon />
                                                        </ListItemIcon>
                                                    <ListItemText primary="Todo" />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider />
                                            <ListItem disablePadding>
                                                <ListItemButton 
                                                    sx={navbarStyles.drawerMenuListItemButton} 
                                                    onClick={() => {
                                                        handlelogout();
                                                        closeMobileMenu();
                                                    }}
                                                >
                                                        <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                            <Logout />
                                                        </ListItemIcon>
                                                    <ListItemText primary="Çıkış" />
                                                </ListItemButton>
                                            </ListItem>
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
         {/* Mobile navbar section end */}
      </Container>
  </AppBar >
  )
}

export default Navbar