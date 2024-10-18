const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Books API",
        description: "An API that stores information about the books I've read.",
    },
    schemes: ["https"],
    host: "books-jki9.onrender.com"
};

const outputFile = "./swagger.json";
const routes = ["./src/index.ts"];

swaggerAutogen(outputFile, routes, doc);