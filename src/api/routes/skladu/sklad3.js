const app = require("express").Router();
const {Skladu} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {Sklad3} = require("../../controllers/skladu");
const {readHelper, readByIdHelper, deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/sklad3", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Skladu.Sklad3));

app.get("/sklad3_zalushok", verifyUserToken, roleAccess(["String2", "String1"]), Sklad3.zalushok);

app.get("/sklad3/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Skladu.Sklad3));

app.post("/sklad3", verifyUserToken, roleAccess(["String2", "String1"]), Sklad3.pruxodSklad3);

app.post("/sklad3_4", verifyUserToken, roleAccess(["String2", "String1"]), Sklad3.rozxidToSklad4);

app.patch("/sklad3_4/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad3.updateRozxidToSklad4);

app.patch("/sklad3/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad3.updateSklad3);

app.delete("/sklad3/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Skladu.Sklad3));

module.exports = app;
