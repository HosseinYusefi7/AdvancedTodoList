export function TodoFilterForm({ filterName, setFilterName, hide, setHide }) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>
      <label className="hide-completed">
        <input
          type="checkbox"
          checked={hide}
          onChange={(e) => setHide(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  );
}
