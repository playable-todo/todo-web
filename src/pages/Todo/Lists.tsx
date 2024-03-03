import { useEffect, useState } from 'react'

// Material UI elements
import { 
  Container,
  Grid, 
  Button,
  Card,
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

// Material UI icons and styles
import { Close, Delete, Bookmarks } from '@mui/icons-material';
import { listPageStyles } from '../../styles';

// Helpers
import { Request } from '../../helpers/Request';

// Components
import { 
    CustomTextField,
    FileUploadInput,
    OldFileInput,
    CustomSelectField
} from '../../components/FormElements';
import { SnackbarAlert } from '../../components/SnackbarAlert';
import TodoSection from '../../components/TodoSection';

// Other npm packages
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';

// Interfaces
import { TodoProps, TagsProps } from './todo.interface';
import { snackbarOptionsProps } from '../../components/component';

const Lists = () => {
    // React Router elements
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const tagQuery = searchParams.get('tag');

    // useStates
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState<TodoProps[]>([]);
    const [tags, setTags] = useState<TagsProps[]>([]);
    const [editData, setEditData] = useState<TodoProps | any>({});
    const [snackbarData, setSnackbarData] = useState<snackbarOptionsProps>({});
    const [filters, setFilters] = useState<string[]>([]);

    // useEffects

    // Retrieves data from backend
    useEffect(() => {
        getTodoFromApi();
    }, [])

    // Retrieves elements to be filtered
    useEffect(() => {
        const updateParams = [];
        if(searchQuery){
            updateParams.push("search=" + searchQuery)
        }
        if(tagQuery){
            updateParams.push("tag=" + tagQuery)
        }

        setFilters(updateParams)
    }, [searchQuery, tagQuery])

    // Filters Todo's
    useEffect(() => {
        if(filters.length > 0){
            getTodoFromApi();
        }
    }, [filters])

    // formik

    // Add form and process
    const addFormik = useFormik({
      initialValues: {
          title: '',
          todo: '',
          photo: '',
          attachment: '',
          selectedTag: '0'
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

    // Edit form and process
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

    // Functions

    // Sends a request to fetch data from the database
    const getTodoFromApi = async() => {
        const url = '/todo/list';
        const fullUrl = url + (filters.length > 0 ?  "?" + filters.join("&"): "")
        const result: TodoProps[] | any = await Request({
            method: 'GET',
            url: filters.length > 0 ? fullUrl : url
        });

        setTodo(result.todos);
        setTags(result.tags)
        return result
    }

    // Filters by tags
    const handleSearchTag = (tag_id:string) => {
        setSearchParams((prev) => {
            prev.set("tag", tag_id);
            return prev;
        });
    }

    // Deletes Todos
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

    // Dialog (Modal) process

    // Closes modal
    const handleClose = () => {
        setOpen(false);
        setEditData({});
    };

    // Todo opens edit modal
    const handleTodoOpen = (todo: TodoProps) => {
        setOpen(true)
        setEditData(todo)
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    // Forms

    // Todo add form
    const addForm = (
      <form
          method='POST'
          onSubmit={addFormik.handleSubmit}
      >
        <Box sx={listPageStyles.elementsBox}>
            <CustomTextField 
                label='Başlık'
                type='text'
                name='title'
                value={addFormik.values.title}
                hasError={Boolean(addFormik.touched.title)}
                placeholder='Başlık'
                handleChange={addFormik.handleChange}
                size="small"
            />
        </Box>
        <Box sx={listPageStyles.elementsBox}>
            <CustomTextField 
                label='Todo'
                type='text'
                name='todo'
                value={addFormik.values.todo}
                hasError={Boolean(addFormik.touched.todo)}
                placeholder='Bi to-do ekleyin'
                handleChange={addFormik.handleChange}
                size="small"
            />
        </Box>
        <Box sx={listPageStyles.elementsBox}>
            <CustomSelectField 
                label="Tag"
                name="selectedTag"
                value={addFormik.values.selectedTag}
                selectItems={tags}
                hasError={false}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={listPageStyles.elementsBox}>
            <FileUploadInput 
                label="Görsel Ekle"
                name='photo'
                oldFileName=''
                type="image"
                setAlert={setSnackbarData}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={listPageStyles.elementsBox}>
            <FileUploadInput 
                label="Ek dosya"
                name='attachment'
                oldFileName=''
                type="attachment"
                setAlert={setSnackbarData}
                handleFormik={addFormik}
            />
        </Box>
        <Box sx={listPageStyles.bottomButtonBox}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Button 
                      color="error"
                      variant='contained'
                      onClick={handleClose}
                    >Vazgeç</Button>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Box sx={listPageStyles.bottomSubmitButtonBox}>  
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
    
    // Todo edit form
    const editForm  = (
      <form
        method='PUT'
        onSubmit={editFormik.handleSubmit}
      >
          <Box sx={listPageStyles.elementsBox}>
            <CustomTextField 
                label='Başlık'
                type='text'
                name='title'
                value={editFormik.values.title}
                hasError={Boolean(editFormik.touched.title)}
                placeholder='Başlık'
                handleChange={editFormik.handleChange}
                size="small"
            />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
              <CustomTextField 
                  label='Todo'
                  type='text'
                  name='todo'
                  value={editFormik.values.todo}
                  hasError={Boolean(editFormik.touched.todo)}
                  placeholder='Bi to-do ekleyin'
                  handleChange={editFormik.handleChange}
                  size="small"
              />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
            <CustomSelectField 
                  label="Tag"
                  name="selectedTag"
                  value={editFormik.values.selectedTag}
                  selectItems={tags}
                  hasError={false}
                  handleFormik={editFormik}
            />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
              <FileUploadInput 
                  label="Görsel Ekle"
                  name='photo'
                  oldFileName='oldImage'
                  type="image"
                  setAlert={setSnackbarData}
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
              <OldFileInput 
                  name="oldImage"
                  value={editFormik.values.oldImage ? [editFormik.values.oldImage]: []}
                  type="image"
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
              <FileUploadInput 
                  label="Ek dosya"
                  name='attachment'
                  oldFileName='oldattachment'
                  type="attachment"
                  setAlert={setSnackbarData}
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={listPageStyles.elementsBox}>
              <OldFileInput 
                  name="oldattachment"
                  value={editFormik.values.oldattachment ? [editFormik.values.oldattachment]: []}
                  type="oldattachment"
                  handleFormik={editFormik}
              />
          </Box>
          <Box sx={listPageStyles.bottomButtonBox}>
            <Grid container>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Button 
                      color="error"
                      variant='contained'
                      onClick={() => handleDeleteTodo()}
                    ><Delete /> Todo sil</Button>
                </Grid>
                <Grid item xl={6} lg={6} md={6} xs={6} sm={6}>
                    <Box sx={listPageStyles.bottomSubmitButtonBox}>  
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
        {/* Snackbar for alerts */}
        {Object.keys(snackbarData).length > 0 && <SnackbarAlert snackbarOptions={snackbarData} />}
        <Grid container>
            {/* Side tags section */}
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                <Box sx={listPageStyles.sideTagsBox}>
                    <List
                        sx={listPageStyles.sideTagsList}
                        aria-label="contacts"
                    >
                    {tags.length > 0 && tags.map((item, key) => (
                        <ListItem onClick={() => handleSearchTag(item?.tag_id!)} disablePadding key={key}>
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
            {/* Todo section */}
            <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
                {/* Todo add section */}
                 <Card variant="outlined" sx={listPageStyles.todoAddCard}>
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
                    {/* Todo view section */}
                  <Box sx={listPageStyles.todoViewListBox}>
                      {todo.length > 0  && (
                          <TodoSection 
                            data={todo} 
                            handleTodoOpen={handleTodoOpen} 
                          />
                      )}
                  </Box>
            </Grid> 
        </Grid>
        {/* Dialog section */}
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
                    {/* Dialog Top Title */}
                    <Typography sx={listPageStyles.dialogTitle}>
                         {Object.keys(editData).length > 0 ? 'Todo görüntüleme' : 'Bir Todo Ekleyin'}
                    </Typography>
                    {/* Dialog Top close icon section */}
                    <IconButton onClick={() => handleClose()} sx={listPageStyles.dialogTopCloseIcon}>
                        <Close fontSize='large' />
                    </IconButton>
                </Box>
            </DialogTitle>
            {/* Dialog Content section */}
            <DialogContent 
              sx={{ 
                  width: fullScreen ? 'none' : '500px',
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