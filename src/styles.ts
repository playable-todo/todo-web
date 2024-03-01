import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const navbarStyles: Record<string, SxProps<Theme> | undefined> = {
    appBar: {
        bgcolor: 'hsla(0,0%,100%,.87)', 
        boxShadow: 1
    },
    container: {
        marginTop: '5px',
        marginBottom: '5px',
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px' }
    },
    toolbar: {
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px', xs: '0' },
        display: { md: 'flex', xs: 'none' }
    },
    
    // Right auth elements
    rightButtonsGrid: {
        display: { md: 'contents', sm: 'contents', xs: 'none' }
    },
    authBoxGrid: {
        display: 'contents'
    },
    authIconsGrid: {
        paddingLeft: '24px'
    },
    authAvatarIconGrid: {
        paddingRight: '24px'
    },
    authAvatarIconButton: {
        ml: 2
    },
    authAvatar: {
        width: 32,
        height: 32,
        marginRight: '5px'
    },
    authMenuAvatar: {
        width: '56px !important',
        height: '56px !important',
    },
    authMenuAvatarText: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 700,
        paddingLeft: '15px'
    },
    authMenuProfileButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        padding: '0px 25px 0px 25px',
        fontSize: '16px',
        marginTop:'15px',
        marginBottom:'5px',
        borderRadius: 15,
        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
    },
    authMenuSellButton: {
        color: '#FFFFFF',
        backgroundColor: '#ff3f55',
        borderRadius: 5,
        border: '4px solid white',
        '&:hover': { backgroundColor: '#FFFFFF', color: '#ff3f55' },
        padding: '6px 25px 6px 25px'
    },
    authMenuSellButtonText: {
        fontWeight: '600', 
        textTransform: 'none'
    },

    // Right non auth elements
   
    loginButtonOnRight: {
        color: '#ff3f55',
        marginLeft:'24px'
    },
    loginButtonTextOnRight: {
        fontSize: '16px',
        fontWeight: '600', 
        borderBottom: '2px solid #ff3f55', 
        textTransform: 'none'
    },
    sellButtonOnRight: {
        color: '#FFFFFF',
        backgroundColor: '#ff3f55',
        borderRadius: 5,
        border: '4px solid white',
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            color: '#ff3f55' 
        },
        padding: '6px 15px 6px 15px'
    },
    sellButtonTextOnRight: {
        fontWeight: '600', 
        textTransform: 'none'
    },

                            // Mobile Menu Styles
    mobileToolbar: {
        paddingRight: 0,
        paddingLeft: 0,
        display: { md: 'none' }
    },

    // Close ıcon and logo area
    mobileNavbarHamburgerMenuIcon: {
        fontSize: '2.0rem'
    },

    // Drawer styles start
    drawerCloseIconGrid: {
        marginTop: '1px' 
    },
    drawerCloseIcon : {
        fontSize: '2.5rem' 
    },
    drawerLogoIconButton: {
        marginTop: '10px',
        marginLeft: {sm: '0', xs: '15px'},
        padding:'8px 0px 5px 0px'
    },

    // Drawer menu list area
    drawerMenuList: {
        width: '100%', 
       
        bgcolor: 'background.paper' 
    },
    drawerAvatarListItem: {
        marginTop: '20px',
        marginBottom: '20px',
        paddingLeft: 0
    },
    drawerMobileAvatarListItem: {
        marginTop: '20px',
        marginBottom: '10px',
        paddingLeft: 0
    },
    drawerAvatar: {
        width: 50,
        height: 50
    },
    drawerAvatarListItemText: {
        marginLeft: '10px'
    },
    drawerAvatarLoginText: {
        fontWeight: 600, 
        marginLeft: '10px', 
        fontSize: '20px'
    },
    drawerProfileButtonItem: {
        display: 'grid',
        marginRight: '20px',
        marginBottom:'25px',
    },
    authMobileMenuProfileButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        padding: '0px 25px 0px 25px',
        fontSize: '16px',
       
        borderRadius: 15,
        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
    },
    drawerMenuListItemButton: {
        paddingLeft: 0 
    },
    drawerMenuListItemIcon: {
        minWidth: '45px'
    },
    drawerLoginButtonContainer: {
        display: 'inline-grid',
        paddingLeft: 0, 
        paddingRight: 0 
    },
    drawerLoginButton: {
        borderRadius: 5,
        backgroundColor: '#ff3f55',
        textTransform: 'none',
        marginTop: '20px',
        padding: '10px'
    },
    // Drawer styles end

    mobileTopLogo: {
        marginLeft: {sm: 0, xs: '15px'},
        p:'10px 0px 5px 0px'
    },
    mobileLocationListItem: {
        paddingRight: 0
    },
    mobileLocationListItemText:{
        color: '#2c2c2c', 
        fontWeight: '600', 
        textAlign: 'end'
    },
    mobileLocationListItemIcon: {
        minWidth: { 
            xs: '0' 
        }
    },
    mobileSearchPaper: {
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px'
    },
    mobileSearchIconButton: {
        color: '#2c2c2c', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '0px 2px 2px 0px'
    },
    mobileSearchInputBase: {
        ml: 1, 
        flex: 1, 
        pt: 0.1
    },
    inputSearchAreaInputBase: {
        ml: 1.5, 
        flex: 1, 
        pt: 0.5,
        color:'#000000',
        fontWeight: 500 
    },
    inputSearchPaper: { 
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px', 
        width: '100%',
        '&:hover': {
            borderColor: '#000000'
        }
    },
    searchIcon: {
        margin: '5px 25px 8px 5px',
        fontSize: '25px',
        color:'gray'
    }
} 