const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_params_value", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.MaterialsParamsValue));

app.get("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsParamsValue));

app.post("/materials_params_value", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Materials.MaterialsParamsValue));

app.patch("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Materials.MaterialsParamsValue));

app.delete("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsParamsValue));

module.exports = app;
