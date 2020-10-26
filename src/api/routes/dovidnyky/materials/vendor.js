const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/materials_vendor", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Materials.MaterialsVendor));

app.get("/materials_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Materials.MaterialsVendor));
//TODO NORM CREATE/UPDATE
app.post("/materials_vendor", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Materials.MaterialsVendor));

app.patch("/materials_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Materials.MaterialsVendor));

app.delete("/materials_vendor/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Materials.MaterialsVendor));

module.exports = app;
