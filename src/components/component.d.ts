import { TodoProps, TagsProps } from "../pages/Todo/todo.interface"

export type searchProps = {
    device: string
}

// Form Elements Types
export type customTextFieldProps = {
    type: string,
    label: string,
    name: string,
    value: string,
    placeholder: string,
    hasError?: boolean,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    [key: string]: any
}

export type customPasswordFieldProps = {
    label: string,
    name: string,
    value: string,
    placeholder: string,
    hasError?: boolean,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export type FileViewSectionProps = {
    file: any[],
    type: string,
    removeFunc: (param: number) => void,
    isOld: boolean,
}


export type FileUploadInputProps = {
    label: string,
    name: string,
    oldFileName: string,
    type: string,
    setAlert: React.Dispatch<React.SetStateAction<snackbarOptionsProps>>,
    handleFormik: any,
}

export type FileProps = {
    url?: string,
    path?: string,
    mimeType?: string
}

export type OldFileInputProps = {
    name: string,
    value: FileProps[],
    type: string,
    handleFormik: any,
}

export type SelectFieldProps = {
    label: string, 
    name: string, 
    value: string, 
    selectItems: TagsProps[], 
    hasError: boolean, 
    handleFormik: any, 
}


// Other components

export type snackbarOptionsProps = {
    message?: string,
    type?: string
}

export type snackBarProps = {
    snackbarOptions: snackbarOptionsProps
}

export type TodoSectionProp = {
    data: TodoProps[],
    handleTodoOpen: (param: TodoProps) => void;
}
