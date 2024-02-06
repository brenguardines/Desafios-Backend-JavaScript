const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Listening to port ${PUERTO}`);
});

const ProductManager = require("./controllers/productManager.js");
const productManager = new ProductManager("./src/models/products.json");

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("A client connect");

    socket.emit("products", await productManager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        io.sockets.emit("products", await productManager.getProducts());
    })

    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        io.sockets.emit("products", await productManager.getProducts());
    })
})