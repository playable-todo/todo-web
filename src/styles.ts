import { SxProps, Theme } from "@mui/material";

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
        marginTop: 1.4,
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px', xs: '0' },
        display: { md: 'flex', xs: 'none' }
    },
    
    // Right auth elements
    authAvatarIconButton: {
        float: 'right'
    },
    authAvatar: {
        width: 32,
        height: 32
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
    // Right non auth elements
   
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

    // Drawer menu list area
    drawerMenuList: {
        width: '100%', 
        bgcolor: 'background.paper' 
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
    drawerAvatarLoginText: {
        fontWeight: 600, 
        marginLeft: '10px', 
        fontSize: '20px'
    },
    drawerMenuListItemButton: {
        paddingLeft: 0 
    },
    drawerMenuListItemIcon: {
        minWidth: '45px'
    },
} 

export const searchbarStyles: Record<string, SxProps<Theme> | undefined> = {
    mobileSearchPaper: {
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px'
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
    searchButton: {
        padding: 0
    },
    searchIcon: {
        margin: '5px 25px 8px 5px',
        fontSize: {
            lg: '25px', md: '25px', sm: '20px', xs: '20px'
        },
        color:'gray'
    }
}   

export const formElementsStyles: Record<string, SxProps<Theme> | undefined> = {
    elementsBox: {
        marginTop: 2
    },
    bottomButtonBox: {
        marginTop: 4
    },
    bottomSubmitButtonBox: {
        float: 'right'
    }
}

export const listPageStyles: Record<string, SxProps<Theme> | undefined> = {
    // Side tags
    sideTagsBox: {
        marginTop: 4,
        height: 1,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    sideTagsList: {
        width: '100%', 
        maxWidth: 260, 
        bgcolor: 'background.paper'
    },

    // todo section
    todoAddCard: {
        marginTop: 4
    },
    todoViewListBox :{
        marginTop: 4
    },

    // Dialog section
    dialogTitle:{
        display :'contents', 
        fontSize: '16px', 
        fontWeight: 600
    },
    dialogTopCloseIcon: {
        float: 'right', 
        padding: 0
    }
}

// components/TodoSection
export const todoSectionStyles: Record<string, SxProps<Theme> | undefined> = {
    cardContentTitle: {
        fontSize: '16px', 
        fontWeight: 600, 
        marginBottom: 1
    },
    cardContent: {
        fontSize: '16px', 
        marginBottom: 1
    },
    cardImageBox : {
        display: 'inline-flex'
    },
    cardImage : {
        width: 40, 
        marginRight: '5px', 
        border: '2px solid #7c4b00'
    }
}