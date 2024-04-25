interface ContentProps {
    name: string,
    exerciseCount: number
}

export const Content = ({ content }: { content: ContentProps[] }) => {
    return (
        content.map(obj => <p>{obj.name}</p>)
    )
}