import { TodoProps } from "../pages/Todo/todo.interface"

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

export type FileUploadInputProps = {
    label: string,
    name: string,
    type: string,
    handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    setAlert: React.Dispatch<React.SetStateAction<snackbarOptionsProps>>,
    handleFormik: any,
}

export type snackbarOptionsProps = {
    message?: string,
    type?: string
}

export type snackBarProps = {
    snackbarOptions: snackbarOptionsProps
}

export type TodoSectionProp = {
    data: TodoProps[]
}
