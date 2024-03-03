import React, { useState, useRef } from 'react';

// Material UI elements
import { 
    Typography,
    TextField, 
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    Box,
    Fab,
    Grid,
    MenuItem
} from '@mui/material';

// Material UI icons and styles
import { Visibility, VisibilityOff, Add, Close } from '@mui/icons-material';
import { formElementsStyles } from '../styles';

// Interfaces
import { 
    customPasswordFieldProps, 
    customTextFieldProps,
    FileUploadInputProps,
    FileViewSectionProps,
    OldFileInputProps,
    SelectFieldProps
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

export const FileViewSection: React.FC<FileViewSectionProps> = ({file, type, removeFunc, isOld}) => {
    const EndPoint = import.meta.env.VITE_ENDPOINT;

    const onButtonClick = (url: string) => {
        const pdfUrl = "Sample.pdf";
        const link = document.createElement("a");

        link.href = pdfUrl;
        link.download = url; // specify the filename
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
        {file.length > 0 && file.map((item, key) => (
            <>
            <Box 
                sx={formElementsStyles.imageBox} 
                key={key}
            >
                {isOld ? (
                    (type == 'image' ? (
                        <img 
                            src={EndPoint + item?.url}
                            style={{ objectFit: 'cover' }} 
                            width={100} 
                            height={100} 
                            alt="Files" 
                        />
                    ): (
                        <Typography sx={{ p: 2, marginRight: 6 }}>{item.name}</Typography>
                    ))
                ): (
                    (type == 'image' ? (
                        <img 
                            src={URL.createObjectURL(item)}
                            style={{ objectFit: 'cover' }} 
                            width={100} 
                            height={100} 
                            alt="Files"
                        />
                    ): (
                        <Typography sx={{ p: 2, marginRight:4 }}>{item.name}</Typography>
                    ))
                )}             
                    <Box sx={formElementsStyles.closeIconBox}>
                        <IconButton 
                            aria-label="remove to todo" 
                            onClick={() => removeFunc(key)}
                            sx={formElementsStyles.closeIconButton}
                        >
                            <Close sx={formElementsStyles.closeIcon} />
                        </IconButton>
                    </Box>
            </Box>
                {isOld && type !== 'image' && (
                    <Box sx={formElementsStyles.processBox}>
                        <Typography
                            href={EndPoint + item.url}
                            component="a"
                            target='_blank'
                        >
                            Görüntüle
                        </Typography>
                        
                        <Typography
                            onClick={() => onButtonClick(EndPoint + item.url)}
                            sx={formElementsStyles.dowloadProcessText}
                        >
                            İndir
                        </Typography>
                    </Box>
                )}
            </>
        ))}
        </>
    )
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({label, name, oldFileName, type, setAlert, handleFormik, ...rest}) => {
    const [file, setFile] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLDivElement | any>(null);

    const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const getfileList = event.target.files;

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
                    fileInputRef.current.value! = null
                }
            }else{
                handleFormik.setFieldValue(name, files[0]);
                setFile(files)
            }
            handleFormik.setFieldValue(oldFileName, undefined)
            
        }
    }

    const removeSelectFile = (imageKey: number) => {
        const newList = file.filter((veri, key) => key !== imageKey && veri);
        setFile(newList);
        handleFormik.setFieldValue(name, undefined);
        fileInputRef.current.value! = null
    }

    const renderFileInput = (
        <label htmlFor={name}>
            <input
                ref={fileInputRef}
                type="file"
                name={name}
                id={name}
                onChange={(event) => { 
                    handleFormik.handleChange(event);
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
                <FileViewSection 
                    file={file}
                    type={type}
                    removeFunc={removeSelectFile}
                    isOld={false}
                />
            </Grid>
        </Grid>
    )
}

export const OldFileInput: React.FC<OldFileInputProps> = ({name, value, type, handleFormik}) => {
    const removeSelectFile = (imageKey: number) => {
        const newList = value?.filter((veri, key) => key !== imageKey && veri);
        handleFormik.setFieldValue(name, newList.length == 0 && undefined);
    }

    return (
        <>
        {value.length > 0 && (
            <FileViewSection 
                file={value}
                type={type}
                removeFunc={removeSelectFile}
                isOld={true}
            />
        )}
        </>
    )
}

export const CustomSelectField: React.FC<SelectFieldProps> = ({label, name, value, selectItems , hasError, handleFormik, ...rest }) => {

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <TextField
                select
                fullWidth
                size='small'
                name={name}
                value={value}
                error={hasError ? Boolean(value == '' && hasError) : false}
                onChange={handleFormik.handleChange}
                {...rest}
            >
                <MenuItem value="0">Seç</MenuItem>
                {selectItems.length > 0 && selectItems.map((selectItem, key) => (
                    <MenuItem value={selectItem.tag_id} key={key}>
                        {selectItem.title}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}