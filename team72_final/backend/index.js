const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
  const query = {};
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});

app.get("/:name", async (req, resp) => {
  const name = req.params.name;
  let query = {};
  if (name) {
    query = { productName: { $regex: new RegExp(name, "i") } };
  }
  const allProducts = await Product.find(query);
  console.log(allProducts);
  resp.send(allProducts);
}); 

app.post("/insert", async (req, res) => {
  console.log(req.body);
  const p_id = req.body._id;
  const pname = req.body.productName;
  const pprice = req.body.price;
  const psize = req.body.productDescription.size;
  const pres = req.body.productDescription.resolution;
  const pproc = req.body.productDescription.processor;
  const pram = req.body.productDescription.ram;
  const pstorage = req.body.productDescription.storage;
  const poper = req.body.productDescription.operatingSystem;
  const pimage = req.body.image_url;

  const formData = new Product({
    _id: p_id,
    productName: pname,
    productDescription: {
      size: psize,
      resolution: pres,
      processor: pproc,
      ram: pram,
      storage: pstorage,
      operatingSystem: poper
    },
    price: pprice,
    image_url: pimage
  });
  try {
    // await formData.save();
    await Product.create(formData);
    const messageResponse = { message: `Product ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new product:" + err);
  }
});
