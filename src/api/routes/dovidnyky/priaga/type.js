const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_type", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaType));

app.get("/priaga_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaType));

app.post("/priaga_type", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Priaga.PriagaType));

app.patch("/priaga_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Priaga.PriagaType));

app.delete("/priaga_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaType));

module.exports = app;
