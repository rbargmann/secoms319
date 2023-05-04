import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem._id !== el._id);
    setCart(hardCopy);
  };

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

  function searchProducts(productName) {
    console.log(productName);
    if (productName == "") {
      getAllProducts();
      return;
    }
    fetch("http://localhost:4000/" + productName)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }

  const listItems = product.map((el) => (
    // PRODUCT
    <div class="card shadow-sm">
      <img src={el.image_url} alt={el.productName} hspace="30" vspace="30" />
      <div class="card-header">
        <p class="card-text">{el.productName}</p>
      </div>
      <div class="card-body">
        <p class="card-text">
          <ul>
            <li>Size: {el.productDescription.size}</li>
            <li>Resolution: {el.productDescription.resolution}</li>
            <li>Processor: {el.productDescription.processor}</li>
            <li>RAM: {el.productDescription.ram}</li>
            <li>Storage: {el.productDescription.storage}</li>
            <li>Operating System: {el.productDescription.operatingSystem}</li>
          </ul>
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              onClick={() => addToCart(el)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  const listCart = product.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el._id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.image_url} />
        </div>
        <div class="col">
          <div class="row text-muted">{el.productName}</div>
        </div>
        <div class="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div class="col">
          ${el.price} <span class="close">&#10005;</span>
          {howManyofThis(el._id)}
        </div>
      </div>
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem._id === id);
    return hmot.length;
  }

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={30} />
      {el.title}${el.price}
    </div>
  ));

  return (
    <body>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a class="nav-link" href="./index.html">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    aria-current="page"
                    href="./laptops.html"
                  >
                    Laptops
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./headphones.html">
                    Headphones
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./aboutus.html">
                    About us
                  </a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchProducts(e.target.value);
                  }}
                />
              </form>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  document
                    .getElementById("browseView")
                    .classList.add("collapse");
                  document.getElementById("footer").classList.add("collapse");
                  document.getElementById("cart").classList.remove("collapse");
                }}
              >
                <i className="fas fa-shopping-cart"></i>Cart
              </button>
            </div>
          </div>
        </nav>
      </header>
      {
        <main id="browseView">
          <section class="py-5 text-center container">
            <div class="row py-lg-5">
              <div class="col-lg-6 col-md-8 mx-auto">
                <p className="font-weight: bold; font-size: xx-large">
                  ✅ Find Your Laptop Here!
                </p>

                <h6 class="lead text-muted" color="aliceblue;">
                  A collection of Laptops tailored to a wide variety of users.
                  From developers, to students, to regular household use.
                  <br />
                </h6>
              </div>
            </div>
          </section>
          <div class="album py-5 bg-light">
            <div class="container">
              <div
                id="laptops"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {listItems}
              </div>
            </div>
          </div>
        </main>
      }

      {
        <footer
          class="text-muted py-5"
          background-color="rgb(224, 213, 213)"
          id="footer"
        >
          <div class="container">
            <p class="float-end mb-1">
              <a href="#">Back to top</a>
            </p>
            <p class="mb-1">FindYourTech by Autrin and Rangsimun</p>
            <p class="mb-0">
              Have a question?<a href="./aboutus.html"> Contact Us</a>
              <a class="nav-link" href="./aboutus.html"></a>
            </p>
          </div>
        </footer>
      }

      {
        <div class="card collapse" id="cart">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
            </div>
            <div>{listCart}</div>
          </div>
          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <button
                type="button"
                onClick={() => {
                  document
                    .getElementById("validation")
                    .classList.remove("collapse");
                  document.getElementById("cart").classList.add("collapse");
                }}
              >
                Checkout
              </button>
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal" id="cartTotal">
                ${cartTotal}
              </span>
            </p>
          </div>
        </div>
      }

      {
        <div class="container">
          <div class="row">
            <div class="col-2"></div>

            <div class="col-8 card collapse" id="validation">
              <h1>Javascript Form Validation</h1>

              <div id="liveAlertPlaceholder"></div>

              <form class="row g-3" id="checkout-form">
                <div class="col-md-6">
                  <label for="inputName" class="form-label">
                    Full Name
                  </label>
                  <input type="text" class="form-control" id="inputName" />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Must be like, "John Doe"</div>
                </div>

                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Email
                  </label>
                  <input type="email" class="form-control" id="inputEmail4" />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">
                    Must be like, "abc@xyz.efg"
                  </div>
                </div>

                <div class="col-12">
                  <label for="inputCard" class="form-label">
                    Card
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi-credit-card-fill"></i>
                    </span>
                    <input
                      type="text"
                      id="inputCard"
                      class="form-control"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">
                    Address 2
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                  />
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">
                    City
                  </label>
                  <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">
                    State
                  </label>
                  <select id="inputState" class="form-select">
                    <option selected>Choose...</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">
                    Zip
                  </label>
                  <input type="text" class="form-control" id="inputZip" />
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label class="form-check-label" for="gridCheck">
                      Check me out
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-success"
                    onClick={() => {
                      const alertPlaceholder = document.getElementById(
                        "liveAlertPlaceholder"
                      );
                      const form = document.getElementById("checkout-form");
                      const inputCard = document.querySelector("#inputCard");
                      const alertTrigger =
                        document.getElementById("submit-btn");
                      const summaryCard = document.getElementById("summary");
                      const summaryList = document.querySelector(".card > ul");

                      var order = { name: "", email: "", card: "", total: "" };

                      let validate = function () {
                        var val = true;
                        let email = document.getElementById("inputEmail4");
                        let name = document.getElementById("inputName");
                        let card = document.getElementById("inputCard");
                        let items = document.getElementById("cartTotal");

                        if (
                          !email.value.match(
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          )
                        ) {
                          email.setAttribute(
                            "class",
                            "form-control is-invalid"
                          );
                          val = false;
                        } else {
                          email.setAttribute("class", "form-control is-valid");
                          order.email = email.value;
                        }

                        if (name.value.length === 0) {
                          name.setAttribute("class", "form-control is-invalid");
                          val = false;
                        } else {
                          name.setAttribute("class", "form-control is-valid");
                          order.name = name.value;
                        }

                        if (
                          !card.value.match(
                            /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/
                          )
                        ) {
                          card.setAttribute("class", "form-control is-invalid");
                          val = false;
                        } else {
                          card.setAttribute("class", "form-control is-valid");
                          order.card = card.value;
                        }

                        order.total = "$" + cartTotal;

                        if (val) {
                          form.classList.add("collapse");
                          for (const [key, value] of Object.entries(order)) {
                            summaryList.innerHTML +=
                              '<li class="list-group-item"> <b>' +
                              `${key}` +
                              ": </b>" +
                              `${value}` +
                              "</li>";
                          }
                          summaryCard.classList.remove("collapse");
                          alertPlaceholder.innerHTML = "";
                          alert(
                            '<i class="bi-cart-check-fill"></i> You have made an order!',
                            "success"
                          );
                        }
                        return val;
                      };

                      if (!validate()) {
                        alertPlaceholder.innerHTML = "";
                        alert(
                          '<i class="bi-exclamation-circle"></i> Something went wrong!',
                          "danger"
                        );
                      }
                    }}
                  >
                    {" "}
                    <i class="bi-bag-check"></i> Order
                  </button>
                </div>
              </form>

              <div class="card collapse" width="18rem" id="summary">
                <div class="card-body">
                  <h5 class="card-title">Order summary</h5>
                  <p class="card-text">Here is a summary of your order.</p>
                </div>
                <ul class="list-group list-group-flush"></ul>
                <a
                  href=""
                  onClick="location.reload()"
                  class="btn btn-secondary"
                >
                  {" "}
                  <i class="bi-arrow-left-circle"></i>
                  Return
                </a>
              </div>
            </div>

            <div class="col-2"></div>
          </div>
        </div>
      }
    </body>
  );
}

export default App;
