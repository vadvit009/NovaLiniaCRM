const app = require("express").Router();
const {Skladu} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {Sklad2} = require("../../controllers/skladu");
const {readHelper, readByIdHelper, deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/sklad2", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Skladu.Sklad2));

app.get("/sklad2/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Skladu.Sklad2));

app.post("/sklad2", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.pruxodSklad2);

app.post("/sklad2_3", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.rozxidToSklad3);

app.post("/sklad2_4", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.rozxidToSklad4);

app.patch("/sklad2_3/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.updateRozxidToSklad3);

app.patch("/sklad2_4/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.updateRozxidToSklad4);

app.patch("/sklad2/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad2.updateSklad2);

app.delete("/sklad2/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Skladu.Sklad2));

module.exports = app;
