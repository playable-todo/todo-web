import React from 'react'

// Material UI elements
import { 
    IconButton,  
    Paper, 
    InputBase,
  } from "@mui/material"

  // Material UI Icons
import { 
    SearchOutlined } from '@mui/icons-material';

    
// Material UI styles
import { navbarStyles } from '../styles';

import { searchProps } from './component';

const SearchBar: React.FC<searchProps>  = ({device}) => {
    console.log(device)
    return (
        <Paper component="form" sx={device == 'desktop' ? navbarStyles.inputSearchPaper : navbarStyles.mobileSearchPaper}>
            <InputBase
                sx={navbarStyles.inputSearchAreaInputBase}
                placeholder="Arama Yapın"
                inputProps={{
                    readOnly: true
                }}
                startAdornment={<SearchOutlined sx={navbarStyles.searchIcon} />}
            />
        </Paper>
    )
}


export default SearchBar