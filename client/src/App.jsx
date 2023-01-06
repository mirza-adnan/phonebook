import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

function App() {
    const [persons, setPersons] = useState([]);
    const [newPerson, setNewPerson] = useState({ name: "", number: "" });
    const [filter, setFilter] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPerson({ ...newPerson, [name]: value });
    };

    const generateId = () => {
        const maxId =
            persons.length > 0
                ? Math.max(persons.map((person) => person.id))
                : 0;
        return maxId + 1;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPerson.name.trim() && newPerson.number.trim()) {
            const existingPerson = persons.find(
                (person) =>
                    person.name.toLowerCase() === newPerson.name.toLowerCase()
            );

            if (existingPerson) {
                const promptMsg = `${newPerson.name} is already added to phonebook. Replace old numner with a new one?`;
                if (confirm(promptMsg)) {
                    const personObj = {
                        ...existingPerson,
                        number: newPerson.number,
                    };
                    personService
                        .replaceNumber(existingPerson.id, personObj)
                        .then(() => {
                            const newPersons = persons.map((person) => {
                                if (person.id === existingPerson.id) {
                                    return personObj;
                                }
                                return person;
                            });
                            setPersons(newPersons);
                            setNewPerson({ name: "", number: "" });
                        });
                }
            } else {
                const personObj = { ...newPerson, id: generateId() };
                personService.create(personObj).then((data) => {
                    setPersons((prev) => prev.concat(data));
                    setNewPerson({ name: "", number: "" });
                });
            }
        } else alert("Please do not leave anything blank");
    };

    const handleDelete = (id) => {
        return () => {
            personService.deletePerson(id).then(() => {
                setPersons((prev) => prev.filter((person) => person.id !== id));
            });
        };
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        personService.getAll().then((data) => setPersons(data));
    }, []);

    return (
        <div className="App">
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <PersonForm
                newPerson={newPerson}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filter}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;
