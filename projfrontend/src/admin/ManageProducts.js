import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Base
      title="Manage Products Here"
      description="Edit, Delete or Update products"
    >
      <Link to="/admin/dashboard">
        <span className="btn btn-success">Admin Home</span>
      </Link>
      <h2 className="my-5">All Produts:</h2>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center text-white mb-5">
            Total {products.length} Products
          </h3>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2">
                <div className="col-4">
                  <h4 className="text-left text-white">{product.name}</h4>
                </div>
                <div className="col-4">
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="btn btn-success"
                  >
                    <span>Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageProducts;
