const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_type", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.MaterialsType));

app.get("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsType));

app.post("/materials_type", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Materials.MaterialsType));

app.patch("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Materials.MaterialsType));

app.delete("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsType));

module.exports = app;
