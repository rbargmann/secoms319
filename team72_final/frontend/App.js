import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [oneProductUpdate, setOneProductUpdate] = useState([]);
  const [productUpdateId, setProductUpdateId] = useState();
  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [newPrice, setNewPrice] = useState();

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function getOneProductUpdate(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProductUpdate(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  function updateProductPrice(updatePrice, updateId) {
    console.log("Product to update: ", updateId);
    fetch("http://localhost:4000/update/" + updateId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: updatePrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product updated: ", data);
        // Perform any additional actions after updating the product
      })
      .catch((error) => console.error(error));
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }

  function handlePriceChange(event) {
    setNewPrice(event.target.value);
  }

  function handleProductUpdate(event) {
    setProductUpdateId(event.target.value);
    getOneProductUpdate(event.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function handlePriceSubmit(event) {
    event.preventDefault();
    updateProductPrice(newPrice, productUpdateId);
    setNewPrice("");
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showOneItemUpdate = oneProductUpdate.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  return (
    <div class="container my-5">
      <h1 class="mb-3">Catalog of Products</h1>
      <div class="mb-3">
        <button class="btn btn-primary" onClick={() => getAllProducts()}>
          Show All Products
        </button>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
      </div>
      <div class="mb-4">
        <h2>Show all available Products:</h2>
        <hr />
        {viewer1 && <div class="mb-3">Products {showAllItems}</div>}
        <hr />
        <h2>Show one Product by Id:</h2>
        {viewer2 && <div class="mb-3">Product: {showOneItem}</div>}
        <hr />
        <h2>Add a new product :</h2>
        <div class="mb-3">
          <form action="">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">ID</label>
                  <input
                    type="number"
                    class="form-control"
                    name="_id"
                    value={addNewProduct._id}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    value={addNewProduct.title}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    name="price"
                    value={addNewProduct.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    name="description"
                    value={addNewProduct.description}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category</label>
                  <input
                    type="text"
                    class="form-control"
                    name="category"
                    value={addNewProduct.category}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Image</label>
                  <input
                    type="text"
                    class="form-control"
                    name="image"
                    value={addNewProduct.image}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Rate</label>
                  <input
                    type="number"
                    class="form-control"
                    name="rate"
                    value={addNewProduct.rating.rate}
                    onChange={handleChange}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Count</label>
                  <input
                    type="number"
                    class="form-control"
                    name="count"
                    value={addNewProduct.rating.count}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={handleOnSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div class="mb-4">
          <h2>Delete one product:</h2>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="acceptdelete"
              name="acceptdelete"
              checked={checked4}
              onChange={(e) => setChecked4(!checked4)}
            />
            <label class="form-check-label" for="acceptdelete">
              Accept delete
            </label>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => getOneByOneProductPrev()}
          >
            Prev
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => getOneByOneProductNext()}
          >
            Next
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => deleteOneProduct(product[index]._id)}
          >
            Delete
          </button>
          {checked4 && (
            <div class="mt-3" key={product[index]._id}>
              <img src={product[index].image} width={30} alt="" />
              <br />
              Id: {product[index]._id}
              <br />
              Title: {product[index].title}
              <br />
              Category: {product[index].category}
              <br />
              Price: {product[index].price}
              <br />
              Rate: {product[index].rating.rate} and Count:{" "}
              {product[index].rating.count}
              <br />
            </div>
          )}
        </div>
        <div>
          <h3>Update Price:</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="message"
              name="message"
              placeholder="id"
              value={productUpdateId}
              onChange={handleProductUpdate}
            />
          </div>
          <div>Product: {showOneItemUpdate}</div>
          <form onSubmit={handlePriceSubmit}>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="newPrice"
                name="newPrice"
                placeholder="New Price"
                value={newPrice}
                onChange={handlePriceChange}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} // App end
export default App;
