import "./categories.css";

function Categories({ categories, category, setCategory }) {
  return (
    <div className="categories">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Categories;