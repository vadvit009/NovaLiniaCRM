const {patchMachine, createMachine,getMachines, getMachine} = require("../../../controllers/dovidnyky/machines/machines");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper,} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines", verifyUserToken, roleAccess(["String2", "String1"]), getMachines);

app.get("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]),getMachine);

app.post("/machines", verifyUserToken, roleAccess(["String2", "String1"]), createMachine);

app.patch("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMachine);

app.delete("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.Machine));

module.exports = app;
