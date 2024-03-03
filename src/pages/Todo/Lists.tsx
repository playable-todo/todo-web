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
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import { Close, Delete, Bookmarks } from '@mui/icons-material';

import { Request } from '../../helpers/Request';

import TodoSection from '../../components/TodoSection';

import { 
  CustomTextField,
  FileUploadInput,
  OldFileInput,
  CustomSelectField
} from '../../components/FormElements';
import { useFormik } from 'formik';
import { SnackbarAlert } from '../../components/SnackbarAlert';


import { TodoProps, TagsProps } from './todo.interface';
import { snackbarOptionsProps } from '../../components/component';

const Lists = () => {
    // useStates
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState<TodoProps[]>([]);
    const [tags, setTags] = useState<TagsProps[]>([]);
    const [editData, setEditData] = useState<TodoProps | any>({})
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
          attachment: '',
          selectedTag: ''
      },
      onSubmit: async (values) => {
        const {title, todo, photo, attachment, selectedTag} = values;
        
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
            formdata.append("selected_tag", selectedTag);
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

    const editFormik = useFormik({
      enableReinitialize: true,
      initialValues: {
          title: (editData.title ? editData.title : ''),
          todo: (editData.content ? editData.content : ''),
          oldImage: (editData?.image ? editData.image : ''),
          oldattachment: (editData.attachment ? editData.attachment : ''), 
          photo: '',
          attachment: '',
          selectedTag: (editData.tag_id ? editData.tag_id : 0)
      },
      onSubmit: async (values) => {
        const {title, todo, photo, attachment, oldImage, oldattachment, selectedTag} = values;

        let deletedFiles = [];
        if(!oldImage && editData?.image){
            deletedFiles.push(editData.image)
        }
        if(!oldattachment && editData?.attachment){
            deletedFiles.push(editData.attachment)
        }
        
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
            formdata.append("selected_tag", selectedTag);
            photo && formdata.append('file', photo);
            attachment && formdata.append('file', attachment);
            formdata.append('oldFiles', JSON.stringify(deletedFiles))

            const url = '/todo/list/' + editData.todo_id;
            const response = await Request({
                method: 'PUT',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                setSnackbarData({
                    type: 'success',
                    message: 'Başarıyla güncellendi'
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

        setTodo(result.todos);
        setTags(result.tags)
        return result
    }

    const handleClose = () => {
        setOpen(false);
        setEditData({});
    };

    const handleTodoOpen = (todo: TodoProps) => {
      setOpen(true)
      setEditData(todo)
    }

    const handleDeleteTodo = async() => {
        const url = '/todo/list/' + editData?.todo_id;

        const result = await Request({
            method: 'DELETE',
            url: url
        });

        const responseCheck = Object.keys(result).filter(item => item == 'success')

        if(responseCheck){
            setSnackbarData({
                type: 'success',
                message: 'Todo silindi'
            })
            getTodoFromApi();
            handleClose()
        }
        else{
            setSnackbarData({
              type: 'error',
              message: 'Bir hata oluştu'
            })
        } 
    }

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
            <CustomSelectField 
                label="Tag"
                name="selectedTag"
                value={addFormik.values.selectedTag}
                selectItems={tags}
                hasError={Boolean(addFormik.touched.selectedTag)}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <FileUploadInput 
                label="Görsel Ekle"
                name='photo'
                oldFileName=''
                type="image"
                setAlert={setSnackbarData}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={{ marginTop: 2 }}>
            <FileUploadInput 
                label="Ek dosya"
                name='attachment'
                oldFileName=''
                type="attachment"
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

    const editForm  = (
      <form
        method='PUT'
        onSubmit={editFormik.handleSubmit}
      >
          <Box sx={{ marginTop: 2 }}>
            <CustomTextField 
                label='Başlık'
                type='text'
                name='title'
                value={editFormik.values.title}
                placeholder='Başlık'
                handleChange={editFormik.handleChange}
                size="small"
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <CustomTextField 
                  label='Todo'
                  type='text'
                  name='todo'
                  value={editFormik.values.todo}
                  placeholder='Bi to-do ekleyin'
                  handleChange={editFormik.handleChange}
                  size="small"
              />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <CustomSelectField 
                  label="Tag"
                  name="selectedTag"
                  value={editFormik.values.selectedTag}
                  selectItems={tags}
                  hasError={Boolean(editFormik.touched.selectedTag)}
                  handleFormik={editFormik}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <FileUploadInput 
                  label="Görsel Ekle"
                  name='photo'
                  oldFileName='oldImage'
                  type="image"
                  setAlert={setSnackbarData}
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <OldFileInput 
                  name="oldImage"
                  value={editFormik.values.oldImage ? [editFormik.values.oldImage]: []}
                  type="image"
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <FileUploadInput 
                  label="Ek dosya"
                  name='attachment'
                  oldFileName='oldattachment'
                  type="attachment"
                  setAlert={setSnackbarData}
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={{ marginTop: 2 }}>
              <OldFileInput 
                  name="oldattachment"
                  value={editFormik.values.oldattachment ? [editFormik.values.oldattachment]: []}
                  type="oldattachment"
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Button 
                      color="error"
                      variant='contained'
                      onClick={() => handleDeleteTodo()}
                    ><Delete /> Todo sil</Button>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Box sx={{ float: 'right' }}>  
                        <Button 
                            type='submit'
                            color="success"
                            variant='contained'
                        >Kaydet</Button>
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
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                <Box 
                  sx={{
                    marginTop: 4,
                    height: 1,
                    position: 'fixed',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                >
                  <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    aria-label="contacts"
                  >
                  {tags.length > 0 && tags.map((item, key) => (
                    <ListItem disablePadding key={key}>
                      <ListItemButton>
                        <ListItemIcon>
                           <Bookmarks /> 
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </ListItem>
                   ))}
                  </List>
                </Box>
            </Grid> 
            <Grid item xl={9} lg={9} md={9} sm={6} xs={12}>
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
                          <TodoSection 
                            data={todo} 
                            handleTodoOpen={handleTodoOpen} 
                          />
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
                         {Object.keys(editData).length > 0 ? 'Todo görüntüleme' : 'Bir Todo Ekleyin'}
                    </Typography>
                    <IconButton onClick={() => handleClose()} sx={{ float: 'right', padding: 0 }}>
                        <Close fontSize='large' />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent 
              sx={{ 
                  width: fullScreen ? '100%' : '500px',
                  display:'block'
              }}
            >
                {Object.keys(editData).length > 0 ? editForm : addForm}
            </DialogContent>
        </Dialog>
      </Container>
    )
}

export default Lists