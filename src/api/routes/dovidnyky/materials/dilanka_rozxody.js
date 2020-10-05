const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_dilanka_rozxody", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.MaterialsDilankaRozxody));

app.get("/materials_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsDilankaRozxody));

app.post("/materials_dilanka_rozxody", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Materials.MaterialsDilankaRozxody));

app.patch("/materials_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Materials.MaterialsDilankaRozxody));

app.delete("/materials_dilanka_rozxody/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsDilankaRozxody));

module.exports = app;
