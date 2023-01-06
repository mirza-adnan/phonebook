const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            filter:{" "}
            <input type="text" value={filter} onChange={handleFilterChange} />
        </div>
    );
};

export default Filter;
