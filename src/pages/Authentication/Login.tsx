import { useState, useEffect } from 'react';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { CustomTextField, CustomPasswordField } from '../../components/FormElements';

import { useFormik } from "formik";

import { HandleLoginToken, Request } from "../../helpers/Request";
import { snackbarOptionsProps } from '../../components/component';
import { SnackbarAlert } from '../../components/SnackbarAlert';

import { useNavigate } from "react-router-dom";
import { setLoginData, useAppDispatch} from "../../redux/store";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
    
  const [snackbarData, setSnackbarData] = useState<snackbarOptionsProps>({});
  const [passLogin, setPassLogin] = useState<boolean>(false);

    // Login verification
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
        loginVerify();
    }
  },[passLogin])

  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    onSubmit: async (values) => {
      const {email, password} = values;

     if (email == '') {
          setSnackbarData({
            type: 'error',
            message: 'Lütfen gerekli alanları doldurunuz.'
        })
      }
      else if (password == '') {
          setSnackbarData({
            type: 'error',
            message: 'Lütfen gerekli alanları doldurunuz.'
          })
      }
      else {
          const getToken = await HandleLoginToken(email, password);
          if (getToken.error) {
              setSnackbarData({
                type: 'error',
                message: getToken.error_description
              })
          }else {
              setPassLogin(true)
          }
      }
    }
});

  const loginVerify = async () => {
              
    const requestUrl = "/account/session";
    const getData = await Request({
        method: 'GET',
        url: requestUrl
    });

    dispatch(setLoginData(getData));
    navigate('/');
  }

  return (
    <Container component="main" maxWidth="xs">
      {Object.keys(snackbarData).length > 0 && <SnackbarAlert snackbarOptions={snackbarData} />}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1,  }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              To do Login
            </Typography>
            <Box sx={{ mt: '50px' }}>
                <form
                    method='POST'
                    onSubmit={formik.handleSubmit}
                >
                      <CustomTextField
                          type = 'email'
                          label = 'Email'
                          name = 'email'
                          value = {formik.values.email}
                          placeholder = 'Email adresi' 
                          hasError = {formik.touched.email}
                          handleChange = {formik.handleChange}
                          sx={{ marginBottom: 2 }}
                      />

                      <CustomPasswordField 
                          label = 'Parola'
                          name = 'password'
                          value = {formik.values.password}
                          placeholder = 'Parola' 
                          hasError = {formik.touched.password}
                          handleChange = {formik.handleChange}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        size='large'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Giriş Yap
                      </Button>
                </form>
            </Box>
        </Box>
       
    </Container>
  );
}