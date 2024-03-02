import { useState } from 'react';
import { 
    Typography,
    TextField, 
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    Box,
    Fab,
    Grid
} from '@mui/material';

import { Visibility, VisibilityOff, Add, Close } from '@mui/icons-material';

import { 
    customPasswordFieldProps, 
    customTextFieldProps,
    FileUploadInputProps
} from './component';

export const CustomTextField: React.FC<customTextFieldProps>  = ({
    type = 'text', 
    label, 
    name, 
    value, 
    placeholder, 
    hasError, 
    handleChange, 
    ...rest
}) => {

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <TextField
                type={type}
                fullWidth
                name={name}
                placeholder={placeholder ? placeholder : ''}
                value={value}
                error={hasError ? Boolean(value == '' && hasError) : false}
                onChange={handleChange}
                InputProps={type == 'email' ? {
                    endAdornment: (
                      <InputAdornment position="end">
                            @
                      </InputAdornment>
                    ),
                }: {}
                }
                {...rest}
            />
        </>       
    )
}

export const CustomPasswordField: React.FC<customPasswordFieldProps>  = ({
    label, 
    name, 
    value, 
    placeholder, 
    hasError, 
    handleChange, 
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                fullWidth
                type={showPassword ? 'text' : 'password'}
                name={name}
                id={name}
                onChange={handleChange}
                value={value}
                error={hasError ? Boolean(value == '' && hasError) : false}
                placeholder={placeholder ? placeholder : label}
                autoComplete={name}
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                }
                
            />
        </>       
    )
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({label, name, type, handleOnChange, setAlert, handleFormik, ...rest}) => {
    const [file, setFile] = useState<File[]>([]);

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const getfileList = event.target.files;
        
        console.log(getfileList)
        
        if(getfileList){
            const files: File[] = Array.from(getfileList);

            if(type == 'image'){
                if(new RegExp("image/*").test(files[0].type)){
                    handleFormik.setFieldValue(name, files[0]);
                    setFile(files)
                }else{
                    setAlert({
                        type: 'error',
                        message: 'Seçtiğiniz dosya image olmalı'
                    })
                }
            }else{
                handleFormik.setFieldValue(name, files[0]);
                setFile(files)
            }
            
        }
    }

    const removeSelectFile = (imageKey: number) => {
        const newList = file.filter((veri, key) => key !== imageKey && veri);
        setFile(newList);
        handleFormik.setFieldValue(name, undefined)
    }

    const renderFileView = (
        <>
            {file.length > 0 && file.map((item, key) => (
                <Box 
                    sx={{
                        position: 'relative', 
                        margin: '20px 20px 20px 0px' ,
                        display: 'inline-block', 
                        border: '2px solid #7c4b00'
                    }} 
                    key={key}
                >
                    {type == 'image' ? (
                        <img 
                            src={URL.createObjectURL(item)}
                            style={{ objectFit: 'cover' }} 
                            width={100} 
                            height={100} 
                            alt="Files" 
                        />
                    ): (
                        <Typography sx={{ p: 2, marginRight: 4 }}>{item.name}</Typography>
                    )}                        
                        <Box sx={{
                            position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            padding: '5px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-end'
                        }}>
                            <IconButton 
                                aria-label="remove to advert" 
                                onClick={() => removeSelectFile(key)}
                                sx={{
                                    border: '2px solid red',
                                    borderRadius: 3, 
                                    '&:hover': {
                                        backgroundColor :'#FFFFFF'
                                    }
                                }}
                            >
                                <Close sx={{
                                    fontSize: '16px',
                                    color: 'red' 
                                }} />
                            </IconButton>
                        </Box>
                </Box>
            ))}
        </>
    )

    const renderFileInput = (
        <label htmlFor={name}>
            <input
                type="file"
                name={name}
                id={name}
                onChange={(event) => { 
                    handleOnChange;
                    handleUploadFiles(event)
                }}
                style={{ display: 'none' }}
                {...rest}
            />
                <Fab
                    color="success"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <Add /> Yükle
                </Fab>
        </label>
    )

    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <InputLabel sx={{ marginBottom: 2 }} htmlFor="upload-file" >{label}</InputLabel>
                {renderFileInput}
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {renderFileView}
            </Grid>
        </Grid>
    )
}