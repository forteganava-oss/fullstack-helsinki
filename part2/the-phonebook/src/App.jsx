import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Form from './components/Form'
import personServer from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (text, tag = 'success') => {
    setNotification({ text, tag })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
  }
  useEffect(() => {
    personServer
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    setNewName(e.target.name.value)
    setNewNumber(e.target.number.value)
    const hasPerson = persons.find(person => person.name === newName)
    if (hasPerson) {
      if (hasPerson.number === newNumber) {
        alert(`${newName} with number ${number} is already added to the phonebook`)
        setNewName('')
        setNewNumber('')
        return
      }
      if (window.confirm(`${newName} is already addedd to the phone book, replace the old number with a new one?`)) {
        const updatedPerson = { name: hasPerson.name, number: newNumber, id: hasPerson.id }
        personServer
          .update(hasPerson.id, updatedPerson)
          .then(returnedPerson => setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)))
          .catch(() => {
            notify(`Information of ${hasPerson.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== hasPerson.id))
          })
        setNewName('')
        setNewNumber('')
        return
      }


    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personServer
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${returnedPerson.name}`, 'success')
      })

    setNewName('')
    setNewNumber('')
  }
  const handleDeletion = (id) => {
    const delPerson = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${delPerson.name}?`)) {
      personServer
        .erase(id)
        .then(()=> {
          setPersons(persons.filter(person => person.id !== id))
          notify(`Deleted ${delPerson.name}`,'success')
        })
        .catch(() => {
        notify(`Information of ${delPerson.name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.id !== id))
      })
    }

  }
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredArray={filteredPersons} handleDelete={handleDeletion} />
    </div>

  )
}

export default App