import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [spinload, setSpinLoad] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setData(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h2>Loading Products...</h2>
      </div>
    );
  }

  const loadMoreData = () => {
    setSpinLoad(true);
    setTimeout(() => {
      setLimit(limit + 5);
      setSpinLoad(false);
    }, 1500);
  };
  return (
    <div className="app">
      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Something went wrong...
          </Alert>
        </Stack>
      )}
      {data.slice(0, limit).map((item) => {
        return (
          <div key={item.id}>
            <img src={item.images[0]} alt="" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <h3>{item.price + " $"}</h3>
          </div>
        );
      })}
      {data.length > limit && (
        <button onClick={loadMoreData} disabled={spinload}>
          {spinload ? (
            <>
              <div className="btn-spinner"></div>
              <span>Loading...</span>
            </>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
  );
}

export default App;