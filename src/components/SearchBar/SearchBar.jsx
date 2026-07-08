import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <input
        className="search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;