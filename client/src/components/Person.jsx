const Person = ({ person, handleDelete }) => {
    return (
        <li>
            <p>
                {person.name}: {person.number}
            </p>
            <button onClick={handleDelete(person.id)}>delete</button>
        </li>
    );
};

export default Person;
