import React, { useEffect, useMemo, useState } from 'react'

// Material UI elements
import { 
  Container,
  Grid, 
  Button, 
  Avatar,
  Chip,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  IconButton
} from '@mui/material'

import { Close } from '@mui/icons-material';

import { Request } from '../../helpers/Request';

import TodoSection from '../../components/TodoSection';

import { 
  CustomTextField,
  FileUploadInput
} from '../../components/FormElements';
import { useFormik } from 'formik';
import { SnackbarAlert } from '../../components/SnackbarAlert';


import { TodoProps } from './todo.interface';
import { snackbarOptionsProps } from '../../components/component';

const Lists = () => {
    // useStates
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState<TodoProps[]>([]);
    const [snackbarData, setSnackbarData] = useState<snackbarOptionsProps>({});

    // useEffects
    useEffect(() => {
        getTodoFromApi();
    }, [])

    // formik
    const addFormik = useFormik({
      initialValues: {
          title: '',
          todo: '',
          photo: '',
          attachment: ''
      },
      onSubmit: async (values) => {
        const {title, todo, photo, attachment} = values;

        if (title == '') {
            setSnackbarData({
              type: 'error',
              message: 'Lütfen gerekli alanları doldurunuz.'
          })
        }
        else if (todo == '') {
            setSnackbarData({
              type: 'error',
              message: 'Lütfen gerekli alanları doldurunuz.'
            })
        }
        else {
            const formdata: FormData = new FormData();
            formdata.append("title", title);
            formdata.append("todo", todo);
            photo && formdata.append('file', photo);
            attachment && formdata.append('file', attachment);

            const url = '/todo/list';
            const response = await Request({
                method: 'POST',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                setSnackbarData({
                    type: 'success',
                    message: 'Başarıyla eklendi'
                })
                getTodoFromApi();
                addFormik.resetForm();
                handleClose()
            }
            else{
                setSnackbarData({
                  type: 'error',
                  message: 'Bir hata oluştu'
                })
            } 

        }
      }
    });

    const getTodoFromApi = async() => {
        const url = '/todo/list';
        const result: TodoProps[] | any = await Request({
            method: 'GET',
            url: url
        });

        setTodo(result);
        return result
    }

    const handleClose = () => {
        setOpen(false);
    };
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const addForm = (
      <form
          method='POST'
          onSubmit={addFormik.handleSubmit}
      >
        <Box sx={{ marginTop: 2 }}>
            <CustomTextField 
                label='Başlık'
                type='text'
                name='title'
                value={addFormik.values.title}
                placeholder='Başlık'
                handleChange={addFormik.handleChange}
                size="small"
            />
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <CustomTextField 
                label='Todo'
                type='text'
                name='todo'
                value={addFormik.values.todo}
                placeholder='Bi to-do ekleyin'
                handleChange={addFormik.handleChange}
                size="small"
            />
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <FileUploadInput 
                label="Görsel Ekle"
                name='photo'
                type="image"
                handleOnChange={addFormik.handleChange}
                setAlert={setSnackbarData}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <FileUploadInput 
                label="Ek dosya"
                name='attachment'
                type="attachment"
                handleOnChange={addFormik.handleChange}
                setAlert={setSnackbarData}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={{ marginTop: 4 }}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Button 
                      color="error"
                      variant='contained'
                      onClick={handleClose}
                    >Vazgeç</Button>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Box sx={{ float: 'right' }}>  
                        <Button 
                            type='submit'
                            color="success"
                            variant='contained'
                        >Ekle</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
      </form>
    )

    return (
      <Container>
        {Object.keys(snackbarData).length > 0 && <SnackbarAlert snackbarOptions={snackbarData} />}
        <Grid container>
            <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                <Box 
                  sx={{
                    height: 1,
                    position: 'fixed',
                    backgroundImage: `url('/assets/images/background/nav-bg.png');`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <Typography>Side Nav</Typography>
                </Box>
            </Grid> 
            <Grid item xl={10} lg={10} md={10} sm={6} xs={12}>
                 <Card variant="outlined" sx={{ marginTop: 4 }}>
                      <CardContent sx={{ display: 'contents' }}>
                            <CustomTextField 
                              label=''
                              type='text'
                              name='dummy'
                              value=''
                              placeholder='Bi to-do ekleyin'
                              sx={{
                                "& fieldset": { border: 'none' },
                              }}
                              size="small"
                              onClick={() => setOpen(true)}
                          />
                      </CardContent>
                  </Card>
                  <Box sx={{ marginTop: 4 }}>
                      {todo.length > 0  && (
                          <TodoSection data={todo} />
                      )}
                  </Box>
            </Grid> 
        </Grid>
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xl"
            fullScreen={fullScreen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
           <DialogTitle id="alert-dialog-title">
                <Box sx={{ display :'block' }}>

                    <Typography sx={{ display :'contents', fontSize: '16px', fontWeight: 600 }}>
                          Bir Todo Ekleyin
                    </Typography>
                    <IconButton onClick={() => handleClose()} sx={{ float: 'right', padding: 0 }}>
                        <Close fontSize='large' />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ 
                    width: fullScreen ? '100%' : '500px',
                    display:'block'
            }}>
                   {addForm}
            </DialogContent>
        </Dialog>
      </Container>
    )
}

export default Lists