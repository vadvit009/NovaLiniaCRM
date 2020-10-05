const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines_model", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.MachineModel));

app.get("/machines_model/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.MachineModel));

app.post("/machines_model", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Machines.MachineModel));

app.patch("/machines_model/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Machines.MachineModel));

app.delete("/machines_model/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.MachineModel));

module.exports = app;
