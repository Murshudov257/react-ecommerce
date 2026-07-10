import "./sort.css";

function Sort({ sort, setSort }) {
  return (
    <div className="sort">
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="default">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}

export default Sort;