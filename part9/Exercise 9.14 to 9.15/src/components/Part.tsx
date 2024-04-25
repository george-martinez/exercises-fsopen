import { CoursePart } from "../App"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  

export const Part = ({ part }: { part: CoursePart}) => {
    switch (part.kind) {
        case 'basic':
            return (
                <div><h2>{part.name} {part.exerciseCount}</h2> <p>{part.description}</p></div>
            )
        case 'background':
            return (
                <div><h2>{part.name} {part.exerciseCount}</h2> <p>{part.description} </p> <p>submit to: {part.backgroundMaterial}</p></div>
            )
        case 'group':
            return (
                <div><h2>{part.name} {part.exerciseCount}</h2><p>project exercises {part.groupProjectCount}</p></div>
            )
        case 'special':
            return (
                <div><h2>{part.name} {part.exerciseCount}</h2><p>{part.description}</p><p>required skill: {part.requirements.join(", ")}</p></div>
            )
        default:
            return assertNever(part)
    }
}