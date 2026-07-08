import { useEffect, useState } from "react";
import "./App.css";

import api from "./services/api";

import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ProductCard from "./components/ProductCard/ProductCard";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [spinload, setSpinLoad] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {error && <ErrorMessage />}

      {filteredData.length === 0 ? (
        <h2 className="not-found">
          Products Not Found
        </h2>
      ) : (
        filteredData
          .slice(0, limit)
          .map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))
      )}

      {filteredData.length > limit && (
        <LoadMoreButton
          spinload={spinload}
          loadMoreData={loadMoreData}
        />
      )}

    </div>
  );
}

export default App;