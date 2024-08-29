const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors()); // to connect react js with express js on 4000 port number

// 1 DATABASE CONNECTINO WITH MONGODB
mongoose.connect(
  "mongodb+srv://sinhag620:eHhOJcXKHvo0EG7A@cluster0.s636n.mongodb.net/e-commerce"
);

// 2 API CREATION
app.get("/", (req, res) => {
  res.send("express app is running");
});

// 4 IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// 5 CREATING UPLOAD ENDPOINT FOR IMAGES
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
// 6 SCHEMA FOR CREATING PRODUCTS
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  available: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    // id:req.body.id,
    id: id, // it is automatically generating the id for the new products
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  // to save the product in database
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// 7 CREATING API FOR DELETING PRODUCTS
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// 8 CREATING API FOR GETTING ALL PRODUCTS
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});
// 9 SCHEMA CREATING FOR USER MODEL
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});
// 10 CREATING API FOR REGISTRATING THE USERS
app.post("/signup", async (req, res) => {
  // to check the preexistence of email id and pwd
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with same email id!!",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  //   AUTHENTICATION
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});
// 11 USER LOGIN
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "No user found",
    });
  }
});
// 12 END POINT FOR COLLECTIONS
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-9); // to get recently added new products
  console.log("new collections fetched");
  res.send(newcollections);
});
// 13 END POINT FOR POPULAR
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});
// 15 CREATING MIDDLEWARE TO FETCH USER
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authentication using valid token" });
  } else {
    try {
      // decode the token
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};
// 14 END POINTS FOR ADD TO CART
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
// 15 END POINT FOR REMOVE THE PRODUCT
app.post("/removecart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
// 16 CREATING ENDPOINT FOR GET CART DATA 
app.post("/getcart",fetchUser,async(req,res)=>{
  console.log('get cart');
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})
//3
app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port " + port);
  } else {
    console.log("Error :" + error);
  }
});
