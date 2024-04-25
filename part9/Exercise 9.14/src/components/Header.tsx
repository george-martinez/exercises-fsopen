interface HeaderProps {
    name: string
}

export const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
}