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


export type snackbarOptionsProps = {
    message?: string,
    type?: string
}


export type snackBarProps = {
    snackbarOptions: snackbarOptionsProps
}
