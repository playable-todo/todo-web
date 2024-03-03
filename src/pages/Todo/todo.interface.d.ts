export type FileProps = {
    mimeType: string,
    path: string,
    url: string,
}

export type TodoProps = {
    id?: string,
    title?: string,
    content: string,
    image?: FileProps
    attachment?: FileProps,
    isMake?: boolean,
}

export type TagsProps = {
    tag_id?: string,
    title?: string,
}