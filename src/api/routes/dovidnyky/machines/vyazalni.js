const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines_vyazalni", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.MachineVyazalni));

app.get("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.MachineVyazalni));

app.post("/machines_vyazalni", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Machines.MachineVyazalni));

app.patch("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Machines.MachineVyazalni));

app.delete("/machines_vyazalni/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.MachineVyazalni));

module.exports = app;
