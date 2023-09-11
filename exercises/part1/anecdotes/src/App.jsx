import { useState } from 'react'


const Header = ({ name }) => <h2>{name}</h2>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  const handleVoteClick = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
    setMostVotesIndex(updatedVotes.indexOf(Math.max(...updatedVotes)))
  }

  const handleNextAnecdoteClick = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }

  return (
    <div>
      <Header name="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handleClick={handleVoteClick} text="vote" />
      <Button handleClick={handleNextAnecdoteClick} text="next anecdote" />

      <Header name="Anecdote with most votes" />
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>has {votes[mostVotesIndex]} votes</div>
    </div>
  )
}

export default App