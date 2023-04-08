import React, { useState, useEffect } from "react";
import items from "./selected_products.json";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showClass, setShowClass] = useState(true);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

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
    hardCopy = hardCopy.filter((cartItem) => cartItem.productID !== el.productID);
    setCart(hardCopy);
  };

  const listItems = items.map((el) => (
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
            {/* <button type="button" class="btn btn-sm btn-outline-secondary" onClick={() => addToCart(el)} >
              Add to Cart
            </button> */}
            <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
          </div>
          <div class="card-body">
          ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
          </div>
        </div>
      </div>
    </div>
  ));

  const listCart = items.map((el) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={el.productID}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={el.image_url} />
        </div>
        <div class="col">
          <div class="row text-muted">{el.productName}</div>
          {/* <div class="row">{el.category}</div> */}
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
          {howManyofThis(el.productID)}
        </div>
      </div>
    </div>
  ));

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.productID === id);
    return hmot.length;
  }

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={30} />
      {el.title}${el.price}
    </div>
  ));

  // return (
  //   <div>
  //     <div>{listItems}</div>
  //     <div>Itesm in Cart :</div>
  //     <div>{cartItems}</div>
  //     <div>Order total to pay :{cartTotal}</div>
  //   </div>
  // );

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
              <button type="button" onClick={() => setShowClass(!showClass)}>
                {" "}
                Checkout Cart{" "}
              </button>
            </div>
          </div>
        </nav>
      </header>
      {showClass && (
        <main>
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
      )}

      {showClass && (
        <footer class="text-muted py-5" background-color="rgb(224, 213, 213)">
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
      )}

      {!showClass && (
        <div>
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
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
        </div>
      )}
    </body>
  );
};

export default Shop;
