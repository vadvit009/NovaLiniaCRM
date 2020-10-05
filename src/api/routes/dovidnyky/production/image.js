const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_image", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdImage));

app.get("/prod_image/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdImage));

app.post("/prod_image", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdImage));

app.patch("/prod_image/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdImage));

app.delete("/prod_image/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdImage));

module.exports = app;
