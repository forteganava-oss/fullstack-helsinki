import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '023 44 12' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewName(e.target.name.value)
    setNewNumber(e.target.number.value)
    const hasPerson = persons.some(person => person.name === newName)
    if (hasPerson) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')

  }
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons filteredArray={filteredPersons} />
    </div>

  )
}

export default App