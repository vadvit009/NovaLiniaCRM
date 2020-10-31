const {patchMaterialsParamsValue, createMaterialsParamsValue, getMaterialsParamsValue,getOneMaterialsParamsValue} = require("../../../controllers/dovidnyky/materials/params_value");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readByIdHelper, deleteHelper,} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_params_value", verifyUserToken, roleAccess(["String2", "String1"]), getMaterialsParamsValue);

app.get("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), getOneMaterialsParamsValue);

app.post("/materials_params_value", verifyUserToken, roleAccess(["String2", "String1"]), createMaterialsParamsValue);

app.patch("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMaterialsParamsValue);

app.delete("/materials_params_value/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsParamsValue));

module.exports = app;
