import { useEffect, useState } from "react";
import "./App.css";

import api from "./services/api";

import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ProductCard from "./components/ProductCard/ProductCard";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import SearchBar from "./components/SearchBar/SearchBar";
import Categories from "./components/Categories/categories";
import Sort from "./components/Sort/sort";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [spinload, setSpinLoad] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setData(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const loadMoreData = () => {
    setSpinLoad(true);

    setTimeout(() => {
      setLimit((prev) => prev + 5);
      setSpinLoad(false);
    }, 1500);
  };

  if (loading) {
    return <Loader />;
  }

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || item.category === category),
  );

  const sortedData = [...filteredData];
  const categories = [...new Set(data.map((item) => item.category))];

  if (sort === "asc") {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    sortedData.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="app">

      <SearchBar search={search} setSearch={setSearch} />
      <div className="filters">
        <Categories
          categories={categories}
          category={category}
          setCategory={setCategory}
        />

        <Sort sort={sort} setSort={setSort} />
      </div>

      {error && <ErrorMessage />}

      {sortedData.length === 0 ? (
        <h2 className="not-found">Products Not Found</h2>
      ) : (
        sortedData
          .slice(0, limit)
          .map((item) => <ProductCard key={item.id} item={item} />)
      )}

      {sortedData.length > limit && (
        <LoadMoreButton spinload={spinload} loadMoreData={loadMoreData} />
      )}
    </div>
  );
}

export default App;
