import React from 'react'

// Material UI elements
import { 
    IconButton,  
    Paper, 
    InputBase,
    Button
  } from "@mui/material"

  // Material UI Icons
import { 
    SearchOutlined } from '@mui/icons-material';

    
// Material UI styles
import { navbarStyles } from '../styles';

import { useFormik } from 'formik';

import { searchProps } from './component';

import { useNavigate } from 'react-router-dom';

import slugify from 'react-slugify';

import { useSearchParams } from 'react-router-dom';

const SearchBar: React.FC<searchProps>  = ({device}) => {
    const navigate = useNavigate();
    // React Router
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            search: searchQuery ? searchQuery : ''
        },
        onSubmit: async(values) => {
            const {search} = values;
            const checkSearch = slugify(search)

            if(search !== ''){
                navigate('/?=' + checkSearch)
            }
        }
    })

    return (
        <Paper component="form" sx={device == 'desktop' ? navbarStyles.inputSearchPaper : navbarStyles.mobileSearchPaper}>
            <form
                onSubmit={formik.handleSubmit}
            >
                <InputBase
                    sx={navbarStyles.inputSearchAreaInputBase}
                    placeholder="Arama Yapın"
                    name="search"
                    size='small'
                    startAdornment={
                        <Button
                            type="submit"
                            size='small'
                            color="primary"
                            aria-label="directions">
                            <SearchOutlined sx={navbarStyles.searchIcon} />
                        </Button>
                    }
                    onChange={formik.handleChange}
                    value={formik.values.search}
                />
                
            </form>
        </Paper>
    )
}


export default SearchBar