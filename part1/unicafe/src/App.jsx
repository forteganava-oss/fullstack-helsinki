import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}
const StatisticLine = ({text,value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}
const Statistics = ({values}) => {
  if (values.all === 0) return <div>No feedback given</div>
  const keys = Object.keys(values)
  return (
    <table>
      <tbody>
      {keys.map((key)=>{
        return <StatisticLine key={key} text={key} value={values[key]}></StatisticLine>
      })}
      </tbody>
    </table>
     
  )
  }
  


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (mood) => {
    switch (mood) {
      case 'good':
        return () => setGood(good + 1)
      case 'neutral':
        return () => setNeutral(neutral + 1)
      case 'bad':
        return () => setBad(bad + 1)
    }
  }
  const all = good + bad + neutral
  const average = (good - bad) / all || 0
  const positive = `${(good / all) * 100 || 0} %`
  const updateStats = () =>{
    return {
      good: good,
      neutral: neutral,
      bad: bad,
      all: all,
      average: average,
      positive: positive
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick('good')} text='good' />
      <Button onClick={handleClick('neutral')} text='neutral' />
      <Button onClick={handleClick('bad')} text='bad' />
      <h1>statistics</h1>
      <Statistics values={updateStats()} />
      
    </div>
  )
}

export default App