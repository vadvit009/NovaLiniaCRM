const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines_golku", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.MachineGolku));

app.get("/machines_golku/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.MachineGolku));

app.post("/machines_golku", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Machines.MachineGolku));

app.patch("/machines_golku/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Machines.MachineGolku));

app.delete("/machines_golku/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.MachineGolku));

module.exports = app;
