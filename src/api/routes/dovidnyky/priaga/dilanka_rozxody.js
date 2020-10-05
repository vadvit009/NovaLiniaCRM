const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/priaga_dilanka_rozxody", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Priaga.PriagaDilankaRozxody));

app.get("/priaga_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Priaga.PriagaDilankaRozxody));

app.post("/priaga_dilanka_rozxody", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Priaga.PriagaDilankaRozxody));

app.patch("/priaga_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Priaga.PriagaDilankaRozxody));

app.delete("/priaga_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Priaga.PriagaDilankaRozxody));

module.exports = app;
