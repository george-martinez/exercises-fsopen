interface TotalProps {
    totalExercises: number
}

export const Total = (props: TotalProps) => {
    return <p>Number of exercises: {props.totalExercises}</p>
}