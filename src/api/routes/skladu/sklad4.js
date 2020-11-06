const app = require("express").Router();
const {Skladu} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {Sklad4} = require("../../controllers/skladu");
const {readHelper, readByIdHelper, deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/sklad4", verifyUserToken, roleAccess(["String2", "String1"]), Sklad4.getSklad);

app.get("/sklad4_zalushok", verifyUserToken, roleAccess(["String2", "String1"]), Sklad4.zalushok);

app.get("/sklad4/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Skladu.Sklad4));

app.post("/sklad4", verifyUserToken, roleAccess(["String2", "String1"]), Sklad4.pruxodSklad4);

app.patch("/sklad4/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad4.updateSklad4);

app.delete("/sklad4/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Skladu.Sklad4));

module.exports = app;
