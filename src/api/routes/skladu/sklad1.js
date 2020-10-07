const app = require("express").Router();
const {Skladu} = require('../../models')
const {
    verifyUserToken
} = require("../../middleware/jwtAuth");

const {Sklad1} = require("../../controllers/skladu");
const {readHelper, readByIdHelper, deleteHelper} = require("../../utils/CRUDhelper");
const {roleAccess} = require('../../utils/RoleHelper');

app.get("/sklad1", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.getSklad);

app.get("/sklad1/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Skladu.Sklad1));

app.post("/sklad1", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.pruxodSklad1);

app.post("/sklad1_2", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.rozxidToSklad2);

app.post("/sklad1_3", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.rozxidToSklad3);

app.post("/sklad1_4", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.rozxidToSklad4);

app.patch("/sklad1_2/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.updateRozxidToSklad2);

app.patch("/sklad1_3/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.updateRozxidToSklad3);

app.patch("/sklad1_4/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.updateRozxidToSklad4);

app.patch("/sklad1/:id", verifyUserToken, roleAccess(["String2", "String1"]), Sklad1.updateSklad1);

app.delete("/sklad1/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Skladu.Sklad1));

module.exports = app;
