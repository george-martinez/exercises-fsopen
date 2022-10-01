const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
	return(
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({ parts }) => {
	return(
		<>
			{
				parts.map((part) => <Part part={part} key={part.id}/>)
			}
		</>
	)
}

const Course = ({ course }) => {
	const total = course.parts.reduce((accumulator, part) => {
		return (accumulator + part.exercises)
	}, 0)

	return (
		<>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total sum={total} />
		</>
	)
}

export default Course