const app = require("express").Router();
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");
const {login} = require('../../controllers/users');

// app.get("/prod_color", verifyUserToken, readHelper(Dovidnyky.Production.ProdColor));

// app.get("/prod_color/:id", verifyUserToken, readByIdHelper(Dovidnyky.Production.ProdColor));

app.post("/login", login);

// app.patch("/prod_color/:id", verifyUserToken, patchHelper(Dovidnyky.Production.ProdColor));

// app.delete("/prod_color/:id", verifyUserToken, deleteHelper(Dovidnyky.Production.ProdColor));

module.exports = app;
