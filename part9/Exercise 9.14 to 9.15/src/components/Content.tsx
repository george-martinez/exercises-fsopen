import { Part } from "./Part"
import { CoursePart } from "../App"

export const Content = ({ content }: { content: CoursePart[] }) => {
    return (
        content.map(part => <Part key={part.name} part={part}></Part>)
    )
}