const Persons = ({filteredArray,handleDelete}) =>(
    filteredArray.map(person =>
          <Person key={person.name }person={person}handleDelete={()=> handleDelete(person.id)}/>
        ))


const Person = ({person,handleDelete}) => (
    <div >{person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
    </div>
)
    


export default Persons