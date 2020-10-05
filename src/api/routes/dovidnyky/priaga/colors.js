const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_color", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaColor));

app.get("/priaga_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaColor));

app.post("/priaga_color", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Priaga.PriagaColor));

app.patch("/priaga_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Priaga.PriagaColor));

app.delete("/priaga_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaColor));

module.exports = app;
