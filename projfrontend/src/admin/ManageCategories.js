import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Manage Categories"
      description="Edit or Delete Categories Here"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-success mb-5">
        Admin Home
      </Link>
      <div className="row bg-dark rounded">
        <div className="col-12">
          <h2 className="text-center text-white my-5">
            Total {categories.length} Categories
          </h2>

          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-3">
                <div className="col-6">
                  <h4 className="text-white text-left">{category.name}</h4>
                </div>
                <div className="col-3">
                  <button className="btn btn-success">Edit</button>
                </div>
                <div className="col-3">
                  <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageCategories;
