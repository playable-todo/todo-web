import { useState, useEffect } from 'react';

// Material UI Elements
import { 
  Container, 
  Grid, 
  Avatar, 
  Button, 
  Box,
  Typography,
} from '@mui/material';

// Material UI İcons
import { LockOutlined } from '@mui/icons-material';

// Helpers
import { HandleLoginToken, Request, RequestPublic } from "../../helpers/Request";

// Components
import { CustomTextField, CustomPasswordField } from '../../components/FormElements';
import { snackbarOptionsProps } from '../../components/component';
import { SnackbarAlert } from '../../components/SnackbarAlert';

// Redux
import { setLoginData, useAppDispatch} from "../../redux/store";

// Other npm packages
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // Redux and react router
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  // useStates
  const [snackbarData, setSnackbarData] = useState<snackbarOptionsProps>({});
  const [passLogin, setPassLogin] = useState<boolean>(false);
  const [passRegister, setPassRegister] = useState<boolean>(false)

  // useEffects

  // Login verification
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
        loginVerify();
    }
  },[passLogin])

  // Formiks
  // Login formik
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

  // register formik
  const registerFormik = useFormik({
    initialValues: {
        fullname: '',
        email: '',
        pass: ''
    },
    onSubmit: async (values) => {
      const {fullname, email, pass} = values;

      if (fullname == '') {
       
          setSnackbarData({
            type: 'error',
            message: 'Lütfen gerekli alanları doldurunuz.'
          })
      }
      else if (email == '') {
       
          setSnackbarData({
            type: 'error',
            message: 'Lütfen gerekli alanları doldurunuz.'
        })
      }
      else if (pass == '') {
          setSnackbarData({
            type: 'error',
            message: 'Lütfen gerekli alanları doldurunuz.'
          })
      }
      else {
          const formdata: FormData = new FormData();
          formdata.append("fullname", fullname);
          formdata.append("email", email);
          formdata.append("password", pass);

          const url = "/account/session";
          const postData: any = await RequestPublic({
              method: 'POST',
              url: url,
              formData: formdata 
          })
          
          if(postData.error){
              setSnackbarData({
                type: 'error',
                message: postData?.error_description
              })
          }
          else{
            const data = await HandleLoginToken(email, pass);
                      
            if(!data.error){
                setPassLogin(true);
            }else{
              setSnackbarData({
                type: 'sucess',
                message: 'Kaydınız başarıyla tamamlandı'
              })
            }
          }
      } 
    }
  });

  // Functions
  const loginVerify = async () => {
      const requestUrl = "/account/session";
      const getData = await Request({
          method: 'GET',
          url: requestUrl
      });

      dispatch(setLoginData(getData));
      navigate('/');
  }

  const LoginForm = (
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
  )

  const RegisterForm = (
      <form
          method='POST'
          onSubmit={registerFormik.handleSubmit}
      > 
            <CustomTextField
                type ='text'
                label = 'Ad ve soyadınız'
                name = 'fullname'
                value = {registerFormik.values.fullname}
                placeholder = 'Ad ve soyadınız' 
                hasError = {registerFormik.touched.fullname}
                handleChange = {registerFormik.handleChange}
                sx={{ marginBottom: 2 }}
            />
            <CustomTextField
                type = 'email'
                label = 'Email'
                name = 'email'
                value = {registerFormik.values.email}
                placeholder = 'Yeni Email adresi' 
                hasError = {registerFormik.touched.email}
                handleChange = {registerFormik.handleChange}
                sx={{ marginBottom: 2 }}
            />
            <CustomPasswordField 
                label = 'Parola'
                name = 'pass'
                value = {registerFormik.values.pass}
                placeholder = 'Yeni Parola' 
                hasError = {registerFormik.touched.pass}
                handleChange = {registerFormik.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              size='large'
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kayıt ol
            </Button>
      </form>
  )

  return (
    <Container component="main" maxWidth="xs">
      {Object.keys(snackbarData).length > 0 && <SnackbarAlert snackbarOptions={snackbarData} />}

      {/* Box section */}
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1,  }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              {passRegister ? 'Üye ol' : 'Giriş Yapma'}
            </Typography>

            {/* Forms */}
            <Box sx={{ mt: '50px' }}>
                {passRegister ? RegisterForm : LoginForm}
                <Grid container>
                    <Grid item>
                      <Typography sx={{ color: 'blue', cursor: 'pointer' }} onClick={() => setPassRegister(!passRegister)}>
                          {passRegister ? "Hesabın var mı ? o zaman giriş yap"  : "Hesabın yok mu? hemen üye ol"}
                      </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  );
}