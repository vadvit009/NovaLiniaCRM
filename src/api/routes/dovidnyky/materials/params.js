const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_params", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.MaterialsParams));

app.get("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsParams));

app.post("/materials_params", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Materials.MaterialsParams));

app.patch("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Materials.MaterialsParams));

app.delete("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsParams));

module.exports = app;
