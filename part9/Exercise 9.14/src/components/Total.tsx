interface TotalProps {
    totalExercises: number
}

export const Total = (props: TotalProps) => {
    return <p>{props.totalExercises}</p>
}