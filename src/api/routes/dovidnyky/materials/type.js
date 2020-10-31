const {createMaterialsType, patchMaterialsType, getMaterialsType} = require("../../../controllers/dovidnyky/materials/type");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_type", verifyUserToken, roleAccess(["String2", "String1"]), getMaterialsType);

app.get("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsType));

app.post("/materials_type", verifyUserToken, roleAccess(["String2", "String1"]), createMaterialsType);

app.patch("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMaterialsType);

app.delete("/materials_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsType));

module.exports = app;
