import Person from "./Person";

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <ul>
            {persons.map((person) => {
                const show = person.name.includes(filter);
                return (
                    show && (
                        <Person
                            person={person}
                            key={Math.random()}
                            handleDelete={handleDelete}
                        />
                    )
                );
            })}
        </ul>
    );
};

export default Persons;
