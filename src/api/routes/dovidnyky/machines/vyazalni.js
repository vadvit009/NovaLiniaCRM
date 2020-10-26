const {createMachineVyazalni, patchMachineVyazalni} = require("../../../controllers/dovidnyky/machines/vyazalni");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines_vyazalni", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.MachineVyazalni));

app.get("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.MachineVyazalni));
//TODO NORMALIZE CREATE
app.post("/machines_vyazalni", verifyUserToken, roleAccess(["String2", "String1"]), createMachineVyazalni);

app.patch("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMachineVyazalni);

app.delete("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.MachineVyazalni));

module.exports = app;
