import { useState } from 'react'
//the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

const StatisticLine = ( { text, value }) => {
	return (
		<tr>
			<td>
				{text}
			</td>
			<td>
				{value}
			</td>
		</tr>
	)
}

const Statistics = ( { good, neutral, bad }) => {
	return(
		<div>
			<h2>statistics</h2>
			<table>
				<tbody>
					<StatisticLine text="good" value = {good} />
					<StatisticLine text="neutral" value = {neutral} />
					<StatisticLine text="bad" value = {bad} />
					<StatisticLine text="total" value = {good + neutral + bad} />
					<StatisticLine text="average" value = {(good - bad) / (good + neutral + bad)} />
					<StatisticLine text="positive" value = {(good / (good + neutral + bad)) * 100} />
				</tbody>
			</table>
		</div>
	)
}

const Button = ({ state, setState, text }) => {
	return (
		<button onClick={() => setState(state + 1)}>{text}</button>
	)
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
		<h1>Give feedback</h1>
		<Button text={"good"} state={good} setState={setGood}/>
		<Button text={"neutral"} state={neutral} setState={setNeutral}/>
		<Button text={"bad"} state={bad} setState={setBad}/>
		{good + neutral + bad === 0 ? <p>No feedback given</p> : <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  )
}

export default App