const PersonForm = ({ handleSubmit, handleChange, newPerson }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:{" "}
                <input
                    type="text"
                    name="name"
                    value={newPerson.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                number:{" "}
                <input
                    type="number"
                    name="number"
                    value={newPerson.number}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default PersonForm;
