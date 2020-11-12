const {patchMaterialsParams, createMaterialsParams, getAllMaterialsParams, getSingleMaterialsParams} = require("../../../controllers/dovidnyky/materials/params");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
  verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_params", verifyUserToken, roleAccess(["String2", "String1"]), getAllMaterialsParams);

app.get("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), getSingleMaterialsParams);

app.post("/materials_params", verifyUserToken, roleAccess(["String2", "String1"]), createMaterialsParams);

app.patch("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMaterialsParams);

app.delete("/materials_params/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsParams));

module.exports = app;
