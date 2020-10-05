const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines_duymu", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.MachineDuymu));

app.get("/machines_duymu/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.MachineDuymu));

app.post("/machines_duymu", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Machines.MachineDuymu));

app.patch("/machines_duymu/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Machines.MachineDuymu));

app.delete("/machines_duymu/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.MachineDuymu));

module.exports = app;
