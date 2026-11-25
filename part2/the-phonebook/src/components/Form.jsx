
const Form = ({handleSubmit,newName,setNewName,newNumber,setNewNumber}) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={newName}
                onChange={(e) => setNewName(e.target.value)} name='name' placeholder='insert your text here...'
            />
        </div>
        <div>
            number: <input value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)} name='number' placeholder='insert a valid ph. number...' />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )

export default Form