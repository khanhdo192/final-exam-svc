import React from 'react';
import { Link } from 'react-router-dom';
import './vendor.css';
const EditProduct = () => {
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
          <li className="active">
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
          <li className="">
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
          <div
            className="row justify-content-center align-items-center mt-4 hide"
            id="container-form"
          >
            <div className="col-lg-6 col-lg-offset-4">
              <form>
                <div className="form-group row mb-3">
                  <label htmlFor="input-id" className="col-sm-3 col-form-label">
                    Product ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="input-id"
                      placeholder="Input ID"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="input-name" className="col-sm-3 col-form-label">
                    Product Name
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      className="form-control"
                      id="input-name"
                      placeholder="Input Name"
                    />
                  </div>
                  <label
                    htmlFor="input-quantity"
                    className="col-sm-1 col-form-label"
                    style={{ textAlign: 'right' }}
                  >
                    Quantity
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="input-quantity"
                      placeholder="Input Quantity"
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
                <div className="form-group row mb-3">
                  <label htmlFor="input-price" className="col-sm-3 col-form-label">
                    Price
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="input-price"
                      placeholder="Input Price"
                    />
                  </div>

                  {/* <label
                    htmlFor="input-length"
                    className="col-sm-3 col-form-label"
                    style={{ textAlign: 'right' }}
                  >
                    Length
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="input-length"
                      placeholder="Input Length"
                    />
                  </div> */}
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label" htmlFor="input-color">
                    Color
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="input-color"
                      placeholder="Input color"
                    />
                  </div>
                  <label
                    htmlFor="input-breed"
                    className="col-sm-3 col-form-label"
                    style={{ textAlign: 'right' }}
                  >
                    Category
                  </label>
                  <div className="col-sm-3">
                    <select className="form-control" id="input-category">
                      <option>Select Category</option>
                      <option>Iphone</option>
                    </select>
                  </div>
                </div>
                {/* <div className="form-group row mb-3">
                  <div className="col-sm-3" />
                  <div className="custom-control custom-checkbox col-sm-3">
                    <input type="checkbox" className="custom-control-input" id="input-vaccinated" />
                    <label className="custom-control-label" htmlFor="input-vaccinated">
                      Vaccinated
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox col-sm-3">
                    <input type="checkbox" className="custom-control-input" id="input-dewormed" />
                    <label className="custom-control-label" htmlFor="input-dewormed">
                      Dewormed
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox col-sm-3">
                    <input type="checkbox" className="custom-control-input" id="input-sterilized" />
                    <label className="custom-control-label" htmlFor="input-sterilized">
                      Sterilized
                    </label>
                  </div>
                </div> */}
                <button type="button" className="btn btn-primary" id="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container" style={{ maxWidth: '90%' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Capacity</th>
                <th scope="col">Price</th>
                {/* <th scope="col">Length</th> */}
                <th scope="col">Color</th>
                <th scope="col">Category</th>
                {/* <th scope="col">Vaccinated</th>
                <th scope="col">Dewormed</th>
                <th scope="col">Sterilized</th> */}
                <th scope="col">Date Added</th>
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

export default EditProduct;
