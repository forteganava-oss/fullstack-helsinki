const Persons = ({filteredArray}) =>(
    filteredArray.map(person =>
          <Person key={person.name }person={person}/>
        ))


const Person = ({person}) => (
    <div >{person.name} {person.number}</div>
)
    


export default Persons