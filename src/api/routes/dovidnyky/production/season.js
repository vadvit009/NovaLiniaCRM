const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_season", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdSeason));

app.get("/prod_season/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdSeason));

app.post("/prod_season", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdSeason));

app.patch("/prod_season/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdSeason));

app.delete("/prod_season/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdSeason));

module.exports = app;
