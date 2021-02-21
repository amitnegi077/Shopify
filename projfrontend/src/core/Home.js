import React, { useState, useEffect } from "react";
import "../style.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState();

  const loadProducts = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setErrors(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to T-Shirt Store">
      <div className="row">
        <h1 className="text-white text-center">All of T-shirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
