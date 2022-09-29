import { useState } from 'react'


const MostVotedAnecdote = ({ anecdotes, points }) => {
    let maxIndex = 0
    let max = 0
    
    points.forEach((point, index) => {
      if(point > max){
        max = point
        maxIndex = index
      }
    })

    return(
      <div>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {points[maxIndex]} votes</p>
      </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const addOneVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => setSelected( Math.floor(Math.random() * anecdotes.length)) }>next anecdote</button>
      <button onClick={() => addOneVote()}>vote</button>

      <h2>Anecdote with most votes</h2>
      <MostVotedAnecdote anecdotes={anecdotes} points={points}/>

    </div>
  )
}

export default App