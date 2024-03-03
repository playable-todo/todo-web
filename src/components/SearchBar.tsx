import React from 'react'

// Material UI elements
import { 
    Paper, 
    InputBase,
    Button
  } from "@mui/material"

  // Material UI Icons
import { 
    SearchOutlined } from '@mui/icons-material';

    
// Material UI styles
import { searchbarStyles } from '../styles';

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
        <Paper component="form" sx={device == 'desktop' ? searchbarStyles.inputSearchPaper : searchbarStyles.mobileSearchPaper}>
            <form
                onSubmit={formik.handleSubmit}
            >
                <InputBase
                    sx={searchbarStyles.inputSearchAreaInputBase}
                    placeholder="Arama Yapın"
                    name="search"
                    startAdornment={
                        <Button
                            type="submit"
                            size='small'
                            color="primary"
                            aria-label="directions"
                            sx={searchbarStyles.searchButton}
                        >
                            <SearchOutlined sx={searchbarStyles.searchIcon} />
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