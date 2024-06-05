const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const MongoStore = require("connect-mongo");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
const cors = require("cors");
const addLogger = require("./middleware/logger.middleware.js");
const app = express();
const config = require("./config/config.js")


const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
require("./database.js")

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret:"secretCoder",
    resave: true, 
    saveUninitialized:true,   
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://bguardines:coderhouse@cluster0.iuhkdwd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))
app.use(addLogger);

const isAuthenticated = require("./middleware/authenticate.middleware.js");
app.use(isAuthenticated);

//Test
app.get("/loggerTest", (request, response) => {
    request.logger.error("Important error");
    request.logger.warning("Warning");
    request.logger.info("We are working on the error, in a moment the page will be functioning");

    response.send("Logs generated");
})

//artillery quick --count 40 --num 50 "http://localhost:8080/updateProduct" -o updateProduct.json

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

const generatedProducts = require("./utils/products.utils.js");
app.get("/mockingproducts", (request, response) => {
    const products = [];

    for(let i = 0; i < 100; i++){
        products.push(generatedProducts());
    }
    response.json(products);
})

const httpServer = app.listen(config.puerto, () => {
    console.log(`Listening to port ${config.puerto}`);
});

//Websockets
const SocketManager = require("./sockets/socketManager.js");
new SocketManager(httpServer);


const swaggerJSDoc = require ("swagger-jsdoc");
const swaggerUiExpress = require ("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentation for the App",
            dscription: "App Web about an Ecommerce of electronic products"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));