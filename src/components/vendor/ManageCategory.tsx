import React from 'react';
import { Link } from 'react-router-dom';
import './vendor.css';

const ManageCategory = () => {
  return (
    <div className="wrapper">
      <nav id="sidebar" className="active">
        <div className="sidebar-header" id="sidebar-title">
          <h3>
            <i className="bi bi-envelope-paper-heart-fill" /> Product Management
          </h3>
          <strong>
            <i className="bi bi-list" />
          </strong>
        </div>

        <ul className="list-unstyled components">
          <li>
            <Link to="/vendor">
              <i className="bi bi-house" />
              Home
            </Link>
          </li>
          <li className="">
            <Link to="/editproduct">
              <i className="bi bi-pencil-square" />
              Edit
            </Link>
          </li>
          <li className="">
            <Link to="/searchproduct">
              <i className="bi bi-search" />
              Search
            </Link>
          </li>
          <li className="active">
            <Link to="/managecategory">
              <i className="bi bi-list-ul" />
              Category
            </Link>
          </li>
        </ul>
      </nav>

      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Product Management
            </a>
          </div>
        </nav>
        <div className="container" id="main">
          <div className="row justify-content-center align-items-center mt-4" id="container-form">
            <div className="col-lg-6 col-lg-offset-4">
              <form>
                <div className="form-group row mb-3">
                  <label htmlFor="input-id" className="col-sm-3 col-form-label">
                    Category
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="input-category"
                      placeholder="Input Category"
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="input-capacity" className="col-sm-3 col-form-label">
                    Capacity
                  </label>
                  <div className="col-sm-9">
                    <select className="form-control" id="input-capacity">
                      <option>Select Capacity</option>
                      <option>64GB</option>
                      <option>128GB</option>
                      <option>256GB</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="btn btn-primary" id="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Capacity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="tbody" />
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
