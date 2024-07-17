const FilterSearchBar = ({ filter, handleFilter }) => {
  return (
    <div>
      filter by name: <input value={filter} onChange={handleFilter} />
    </div>
  );
};

export default FilterSearchBar;
